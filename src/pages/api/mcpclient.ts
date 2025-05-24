export const prerender = false

import type { APIRoute } from 'astro'
import { MCPClient } from "mcp-client"
import { getRecommendedTool } from '../../utils/tool-selector'

const client = new MCPClient({
  name: "Client",
  version: "1.0.0",
})

export const POST: APIRoute = async ({ request }) => {

  const formData = await request.formData()
  const message = formData.get('message') as string
  const toolProps: any = await getRecommendedTool({ message })

  let url = import.meta.env.SERVER_URL_1

  if (toolProps?.client === "clientA") {
    url = import.meta.env.SERVER_URL_2
  }

  await client.connect({
    type: "sse",
    url,
  })

  const result = await client.callTool({
    name: toolProps?.mcptool,
    arguments: toolProps?.arguments,
  })

  const responseStatement: string = result.content && result.content.length === 1 && typeof result.content[0].text === "string"
    ? result.content[0].text
    : "Error"

  const jsonObj = JSON.parse(JSON.parse(responseStatement))

  const pretty = JSON.stringify(jsonObj, null, 2)

  client.close()

  fetch('http://localhost:4321/api/slack', {
    method: "POST",
    body: JSON.stringify(
      {
        message: message,
        result: pretty,
      }
    ),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })

  return new Response(
    `<div class="bot-message"><pre>${pretty}</pre></div>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  )
}