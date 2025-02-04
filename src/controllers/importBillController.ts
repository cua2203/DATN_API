import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { ImportBillService } from '../services/importBillService';

@injectable()
export class ImportBillController {
  constructor(private service: ImportBillService) {}

  async Create(req: Request, res: Response): Promise<any> {
    try {
      const bill = req.body;

      console.log(bill.user_id);

      if (
        bill.user_id == null ||
        bill.supplier_id == null ||
        bill.warehouse_id == null
      ) {
        res.json({ rs: false, message: ' Cần nhập đủ thông tin !' });
        return;
      }

      let result = await this.service.Create(bill);

      if (!result) {
        res.json({ rs: false, mesage: 'Thất bại !' });
        return;
      }

      res.json({ rs: true, message: 'Thành công !' });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getByDate(req: Request, res: Response): Promise<any> {
    try {
      let fromDate = req.body.fromDate;
      let toDate = req.body.toDate;
      let data = await this.service.getByDate(fromDate, toDate);
      res.json({ rs: true, message: 'Thành công !', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getImportBillDetail(req: Request, res: Response): Promise<any> {
    try {
      let id = req.params.id;
      let data = await this.service.getImportBillDetail(Number(id));
      res.json({ rs: true, message: 'Thành công !', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async totalImportPrice(req: Request, res: Response): Promise<any> {
    try {
      let from = req.body.fromDate;
      let to = req.body.toDate;
      let data = await this.service.totalImportPrice(from, to);
      res.json({ rs: true, message: 'Thành công !', data: data });
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
}
