import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ProductService } from '../services/productService';
import * as _ from 'lodash';

@injectable()
export class ProductController {
  constructor(private service: ProductService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchString = req.query.searchString?.toString() || '';
      const pageIndex = Number(req.query.pageIndex) || 1;
      const pageSize = Number(req.query.pageSize) || 100;
      const isActive = Number(req.query.isActive) || 2;
      const sort = req.query.sort || '';

      let data = await this.service.getAll();
      let total_count = data.length;

      data = _.filter(data, (item: any) => {
        return searchString != ''
          ? _.includes(
              item.laptop_name.toLowerCase(),
              searchString.toLowerCase(),
            )
          : true;
      });

      if (data && data.length > 0) {
        switch (sort) {
          case '3':
            data = _.orderBy(data, 'laptop_name', 'asc');
            break;
          case '4':
            data = _.orderBy(data, 'laptop_name', 'desc');
            break;
          case '2':
            data = _.orderBy(data, 'id', 'asc');
            break;
          case '1':
            data = _.orderBy(data, 'id', 'desc');
            break;
          default:
            data = _.orderBy(data, 'id', 'asc');
            break;
        }

        let startIndex = (pageIndex - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        data = data.slice(startIndex, endIndex);

        let totalPage = Math.ceil(data.length / pageSize);

        res.json({
          data: data,
          totalPage: totalPage,
          total_count: total_count,
        });
      } else {
        res.json({ message: 'Không lấy được danh sách' });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async getAllwithVariants(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let id = req.params.id;

      const result = await this.service.getAllwithVariants(id);
      if (result) {
        res.json(result);
      } else {
        res.json({ message: 'Bản ghi không tồn tại' });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.service.getById(id);
      if (result) {
        res.json(result);
      } else {
        res.json({ message: 'Bản ghi không tồn tại' });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.service.delete(id);
      res.json({ message: 'Thành công' });
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const laptop = req.body;
      const result = await this.service.update(JSON.stringify(laptop));

      res.json({ message: 'Đã cập nhật thành công', results: result });
    } catch (error: any) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const laptop = req.body;
      const results = await this.service.add(JSON.stringify(laptop));

      res.json({ message: 'Đã cập nhật thành công', results: results });
    } catch (error: any) {
      next(error);
    }
  }

  async export(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const results = await this.service.export();

      res.json({ message: 'Đã export thành công', results: results });
    } catch (error: any) {
      next(error);
    }
  }

  async readExcelData(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.readExcelData('File/1699260332441_laptop.xlsx');
      res.json({ message: 'Đọc thành công !' });
    } catch (error: any) {
      next(error);
    }
  }
}
