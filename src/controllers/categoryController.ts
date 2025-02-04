import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { CategoryService } from '../services/categoryService';
import { Icategory } from '../model/category.model';

@injectable()
export class CategoryController {
  constructor(private service: CategoryService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.service.getAll();

      if (result && result.length > 0) {
        res.json({ rs: true, message: 'Thành công', data: result });
      } else {
        res.json({ rs: false, message: 'Danh sách trống', data: [] });
      }
    } catch (error: any) {
      next(error);
    }
  }
  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.service.getById(id);
      if (result) {
        res.json({ rs: true, message: 'Thành công', data: result });
      } else {
        res.json({ rs: false, message: 'Bản ghi không tồn tại', data: [] });
      }
    } catch (error: any) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.service.delete(id);
      res.json({ message: 'Đã xóa thành công ' });
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const obj: { category_id: any; category_name: any; status: any } =
        req.body;
      const result = await this.service.update(obj);

      res.json({ rs: true, message: 'Đã cập nhật thành công' });
    } catch (error: any) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const obj = req.body;
      const results = await this.service.add(obj.category_name);
      res.json({
        rs: true,
        message: 'Đã thêm mới thành công',
        danhmuc: req.body,
      });
    } catch (error: any) {
      next(error);
    }
  }
}
