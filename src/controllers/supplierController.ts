import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { SupplierService } from "../services/supplierService";

@injectable()
export class SupplierController {
  constructor(private service: SupplierService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.getAll();

      if (!data || data.length == 0) {
        res.json({ rs: false, message: "false", data: [] });
      }

      res.json({ rs: true, message: "success", data: data });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
