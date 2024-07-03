import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CategoryService } from "../services/categoryService";
import { Icategory } from "../model/category.model";

@injectable()
export class CategoryController {
  constructor(private service: CategoryService) {}

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
      const id = req.params.id;
      const category = await this.service.getById(id);   
      if (category) {
        res.json(category);
      } else {
        res.json({ message: 'Bản ghi không tồn tại' });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const category = await this.service.delete(id);   
      res.json({message:"Done!"})
    } catch (error: any) {
      res.json({ message: error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const cat:{category_id:any,category_name:any,status:any} = req.body;
      console.log(cat);
      const results = await this.service.update(cat);   
   
        res.json({ message: 'Đã cập nhật thành công',results:results});
      } catch (error: any) {
        res.json({ message: error.message, results:false,log:typeof(req.body)});
      }
  }



  async add(req: Request, res: Response): Promise<void> {
    try {


      const cat = req.body ;
      const results = await this.service.add(cat.category_name);
      res.json({ message: 'Đã thêm mới thành công',results:results,danhmuc:req.body});
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }
}
