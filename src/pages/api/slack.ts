export const prerender = false

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {

  const { message, result } = await request.json()

  const response = await fetch(import.meta.env.SLACK_POST_MSG_URL, {
    method: "POST",
    body: JSON.stringify(
      {
        channel: import.meta.env.SLACK_CHANNEL,
        text: `*${message}* \n ` + "```" + `${result}` + "```",
        icon_emoji: ':100:',
        username: import.meta.env.SLACK_BOT_USERNAME,
      }
    ),
    headers: { "Content-Type": "application/json", "authorization": `Bearer ${import.meta.env.SLACK_BOT_TOKEN}` },
  })

  const body = await response.json()

  return new Response('Message sent!', { status: 200 })
}