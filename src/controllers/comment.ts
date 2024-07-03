import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CommentService } from "../services/comment";
import { NotificationService } from "../services/notificationService";


@injectable()
export class CommentController {
  constructor(private service: CommentService,private notification : NotificationService  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.getAll();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      
      const data = await this.service.getById(Number(id));
      console.log(data)
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
 
  async add(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body.email ;
      const rate = Number(req.body.rate);
      const text = req.body.text;
      const laptop_id = req.body.laptop_id;
      console.log(req.body)

      const results = await this.service.add(email,rate, text, laptop_id);
      res.json({ message: 'Đã thêm mới thành công',results:results});
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  async getNotification(req: Request, res: Response): Promise<void> {
    try {
      
      const results = await this.notification.getAll();

      res.json({ message: 'Thành công',results:results});
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  async getPost(req: Request, res: Response): Promise<void> {
    try {
      
      const results = await this.service.getAllPost();

      res.json({ message: 'Thành công',results:results});
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  
  async getAllPostTag(req: Request, res: Response): Promise<void> {
    try {
      
      const results = await this.service.getAllPostTag();

      res.json({ message: 'Thành công',results:results});
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  
  async getOnePost(req: Request, res: Response): Promise<void> {
    try {
      let post_id = req.params.id;
      
      const results = await this.service.getOnePost(post_id);

      res.json({ message: 'Thành công',results:results});
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

}
