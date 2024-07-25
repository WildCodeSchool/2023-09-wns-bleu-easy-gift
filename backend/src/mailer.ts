import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

export default nodemailer.createTransport(
    process.env.CI === 'true'
        ? {
              host: 'localhost',
              port: 7777,
              secure: false,
              ignoreTLS: true,
          }
        : {
              service: 'gmail',
              host: process.env.SMTP_HOST as string | undefined,
              port: parseInt(process.env.SMTP_PORT as string) as
                  | number
                  | undefined,
              secure: false, // Use `true` for port 465, `false` for all other ports
              auth: {
                  user: process.env.SMTP_USER as string | undefined,
                  pass: process.env.SMTP_PASSWORD as string | undefined,
              },
          }
)
