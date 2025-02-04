import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { BrandService } from '../services/brandService';
import { IBrand } from '../model/brand.model';

@injectable()
export class BrandController {
  constructor(private service: BrandService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let result = await this.service.getAll();

      res.json({ message: 'Thành công', data: result });
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
      res.status(200).json({ message: 'Thành công', data: result });
    } catch (error: any) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this.service.delete(id);
      res.json({ message: 'Thành công' });
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const brand: { brand_id: number; brand_name: string; image: string } =
      req.body;
    try {
      const result = await this.service.update(brand);

      res
        .status(200)
        .json({ message: 'Đã cập nhật thành công', results: result });
    } catch (error: any) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const obj = req.body;
      const results = await this.service.add(obj);
      res.json({ message: 'Đã thêm mới thành công', results: results });
    } catch (error: any) {
      next(error);
    }
  }
}
