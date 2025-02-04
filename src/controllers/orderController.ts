import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import sgMail from '@sendgrid/mail';
import { OrderService } from '../services/orderService';
import { messaging } from 'firebase-admin';
require('dotenv').config();

@injectable()
export class OrderController {
  private apikey: string = process.env.API_KEY || 'default';
  private fromEmail = process.env.FROM_EMAIL || '';
  constructor(private service: OrderService) {}

  async Create(req: Request, res: Response): Promise<any> {
    try {
      const order = req.body.order;
      const order_detail = req.body.orderDetail;
      await this.service.Create(
        JSON.stringify(order),
        JSON.stringify(order_detail),
      );
      res.json({ mesage: 'Đặt hàng thành công !' });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const data = await this.service.getAll();
      res.status(200).json({ data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async getOrderCount(req: Request, res: Response): Promise<any> {
    try {
      const fromDate = req.body.fromDate;
      const toDate = req.body.toDate;

      const data = await this.service.getOrderCount(fromDate, toDate);
      res.status(200).json({ data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async getOrderTotal(req: Request, res: Response): Promise<any> {
    try {
      const fromDate = req.body.fromDate;
      const toDate = req.body.toDate;
      const data = await this.service.getOrderTotal(fromDate, toDate);
      res.status(200).json({ data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async sendMail(req: Request, res: Response) {
    sgMail.setApiKey(this.apikey);
    const customer = req.body.customer;
    const order = req.body.order;

    let date = new Date(customer.order_date);
    const orderDate = date.toLocaleDateString();

    const orderItemsHtml = order
      .map(
        (item: any) =>
          `<li>${item.quantity}x ${item.laptop_name}-${item.cpu}-${item.ram}-${item.storage} Giá : ${item.price} </li>`,
      )
      .join('');
    const msg = {
      to: customer.Email,
      from: this.fromEmail,
      subject: 'Xác nhận đơn hàng',
      html: `
            <html>
              <body>
                <h1>Xin chào ${customer.Name}</h1>
                <p><a href="http://localhost:4200/">Đơn hàng của bạn đã được xác nhận a> đặt ngày${orderDate}</p>
                  ${orderItemsHtml}

                  
              </body>
            </html>
          `,
    };

    sgMail
      .send(msg)
      .then(() => {
        res.json({ message: 'Email sent' });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  }

  async getOrderDetail(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const data = await this.service.getOrderDetail(id);
      res.status(200).json({ data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const data = await this.service.getOrderById(id);
      res.status(200).json({ data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async Process(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      await this.service.Process(id);
      res.status(200).json({ message: 'Đã cập nhật trạng thái !' });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async Cancel(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      let result = await this.service.Cancel(id);

      res.status(200).json({ rs: true, message: 'Đã hủy đơn hàng !' });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getOrderStatusByID(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      let data = await this.service.getOrderStatusByID(id);
      res.status(200).json({ rs: true, message: 'thành công!', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getByCustomerID(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      let data = await this.service.getByCustomerID(id);
      res.status(200).json({ rs: true, message: 'thành công!', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getDistinctOrderStatus(req: Request, res: Response): Promise<any> {
    try {
      const from = req.body.fromDate;
      const to = req.body.toDate;
      let data = await this.service.getDistinctOrderStatus(from, to);
      res.status(200).json({ rs: true, message: 'thành công!', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getByEmail(req: Request, res: Response): Promise<any> {
    try {
      const email = req.body.email;

      let data = await this.service.getorderByEmail(email);
      console.log(data);

      res.status(200).json({ rs: true, message: 'thành công!', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getCustomerByEmail(req: Request, res: Response): Promise<any> {
    try {
      const email = req.body.email;

      let data = await this.service.getCustomerByEmail(email);
      console.log(data);

      res.status(200).json({ rs: true, message: 'thành công!', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async countProductSaled(req: Request, res: Response): Promise<any> {
    try {
      const from = req.body.fromDate;
      const to = req.body.toDate;
      let data = await this.service.countProductSaled(from, to);
      res.status(200).json({ rs: true, message: 'thành công!', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<any> {
    try {
      const email = req.body.email;
      const otp = req.body.otp;
      let data = await this.service.verifyOtp(email, otp);
      res.json(data);
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  generateOTP(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  }

  async requestEmailOtp(req: Request, res: Response): Promise<any> {
    try {
      let email = req.body.email;
      let otp = this.generateOTP(4);

      sgMail.setApiKey(this.apikey);
      console.log(otp);

      let result = await this.service.requestEmailOtp(email, otp);
      console.log(result);
      console.log(email);
      if (result == 0) {
        res.json({ rs: false, message: 'email không tồn tại trong hệ thống.' });
        return;
      }

      const msg = {
        to: email,
        from: this.fromEmail,
        subject: 'Xác nhận email',
        html: `
                <html>
                  <body>
                    <p>Mã xác nhận của bạn : ${otp}</p>
                      
                  </body>
                </html>
              `,
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log('email sent');
        })
        .catch((error) => {
          res.json({ error: error });
          return;
        });
      res.json({ rs: true, message: 'email tồn tại .' });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
}
