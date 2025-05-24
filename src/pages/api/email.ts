export const prerender = false

import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = `${formData.get('message') as string}
    ----------------------------------------------------------------------
    From: ${import.meta.env.EMAIL_NAME} • email: ${import.meta.env.EMAIL_USER}
    `
    const html = `<div style="margin: 20px auto;font-family: Helvetica, Verdana, sans-serif">${message.replace(
      /[\r\n]/g,
      '<br>'
    )}</div>`

  // Configure your SMTP transport (example uses Gmail)
  const transporter = nodemailer.createTransport({
    host: import.meta.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: import.meta.env.EMAIL_USER,
      pass: import.meta.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `${import.meta.env.EMAIL_NAME} ${import.meta.env.EMAIL_USER}`,
      to: `"${name}" <${email}>`, // the receiving email
      subject: 'New Contact Form Submission',
      text: message,
      html
    })
    return new Response('Message sent!', { status: 200 })
  } catch (err) {
    return new Response('Failed to send email', { status: 500 })
  }
}