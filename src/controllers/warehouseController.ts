import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { WarehouseService } from "../services/warehouseService";

@injectable()
export class WarehouseController {
  constructor(private service: WarehouseService) {}

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
