import { Request, Response } from "express";
import { injectable } from "tsyringe";
import sgMail from '@sendgrid/mail';

require('dotenv').config();

@injectable()

export class SendMail {

  private apikey: string = process.env.API_KEY ||'default';
    private fromEmail = process.env.FROM_EMAIL||'default';

    sendMail(req: Request, res: Response) {
        sgMail.setApiKey(this.apikey);
        const msg = {
            to: 'phamcua670@gmail.com', // Change to your recipient
            from: this.fromEmail, // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            // text: 'and easy to do anywhere, even with Node.js',
            html: `
            <html>
              <body>
                <h1>Xin chào!</h1>
                <p>Đây là nội dung của email.</p>
                 <a href="http://localhost:4200/">Trang chủ</a>
              </body>
            </html>
          `,
        }

        sgMail
            .send(msg)
            .then(() => {
                res.json({message:'Email sent'});
            })
            .catch((error) => {
                res.json({error:error});
            })
    }
}






