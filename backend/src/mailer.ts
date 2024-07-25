//-------------------SMTP

// import nodemailer from 'nodemailer'
// import * as dotenv from 'dotenv'
// dotenv.config()

// export default nodemailer.createTransport(
//     process.env.CI === 'true'
//         ? {
//               host: 'localhost',
//               port: 7777,
//               secure: false,
//               ignoreTLS: true,
//           }
//         : {
//               host: process.env.SMTP_HOST as string | undefined,
//               logger: true,
//               debug: true,
//               port: parseInt(process.env.SMTP_PORT as string) as
//                   | number
//                   | undefined,
//               secure: true, // Use `true` for port 465, `false` for all other ports
//               auth: {
//                   user: process.env.SMTP_USER as string | undefined,
//                   pass: process.env.SMTP_PASSWORD as string | undefined,
//               },
//               tls: {
//                   // Do not fail on invalid certs
//                   rejectUnauthorized: false,
//               },
//           }
// }

//--------------------HTTP

import * as dotenv from 'dotenv'
dotenv.config()

export interface SendMailOptions {
    Messages: Message[]
}

export interface Message {
    From: Contact
    To: Contact[]
    Subject: string
    TextPart?: string
    HTMLPart?: string
}

export interface Contact {
    Name: string
    Email: string
}

const credentials =
    `${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}` as String

export default async function sendMail(
    options?: SendMailOptions
): Promise<any> {
    const authToken = Buffer.from(credentials).toString('base64')
    return fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    })
}
