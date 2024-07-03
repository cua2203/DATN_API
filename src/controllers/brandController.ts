import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { BrandService } from "../services/brandService";

@injectable()
export class BrandController {
  constructor(private service: BrandService) {}

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
      res.json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const brand:{brand_id:number,brand_name:string,image:string} = req.body;
      const results = await this.service.update(brand);   
   
        res.json({ message: 'Đã cập nhật thành công',results:results});
      } catch (error: any) {
        res.json({ message: error.message, results:false});
      }
  }



  async add(req: Request, res: Response): Promise<void> {
    try {
      const cat = req.body ;
      const results = await this.service.add(cat);
      res.json({ message: 'Đã thêm mới thành công',results:results});
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }
}
