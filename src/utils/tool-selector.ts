import { MCPClient } from "mcp-client"

// tool-selector.ts
export const getRecommendedTool = async ({
  message = ''
}: { message?: string }) => {

  const clientA = new MCPClient({
    name: "clientA",
    version: "1.0.0",
  })

  const clientB = new MCPClient({
    name: "clientB",
    version: "1.0.0",
  })

  await clientA.connect({
    type: "sse",
    url: import.meta.env.SERVER_URL_1,
  })

  await clientB.connect({
    type: "sse",
    url: import.meta.env.SERVER_URL_2,
  })

  const clientATools = await clientA.getAllTools()
  const clientBTools = await clientB.getAllTools()

  clientA.close()
  clientB.close()

  const prompt = `
You are a system assistant who only returns the result that is asked. Based on the following message: ${message}, select the appropriate MCP tool.
The list of MCP tools from clientA are ${JSON.stringify(clientATools)} and from clientB are ${JSON.stringify(clientBTools)}.
Which MCP tool should they use and from which client? Return the client, which is either clientA or clientB, the mcptool it is using and the arguments with its values.
This should be in a JSON format with the properties client as a string, mcptool as a string, and arguments as an object where the object contains the required property along with its value.
  `

  const response = await fetch(import.meta.env.LLM_HOST, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-r1:7b', // or 'deepseek-r1:1.5b, etc.'
      prompt: prompt,
      stream: false
    })
  })

  const data = await response.json()
  return extractJsonObject(data.response.trim())
}

const extractJsonObject = (str: string): string => {
  // Look for ```json ... ```
  const codeBlockMatch = str.match(/```json\n({[\s\S]*?})\n```/)
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1])
    } catch (e) {
      throw new Error("Invalid JSON in code block")
    }
  }
  return ""
}
