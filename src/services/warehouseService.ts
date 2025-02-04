import { injectable } from 'tsyringe';
import { WarehouseRepository } from '../repositories/warehouseRepository';
import { IWarehouse } from '../model/warehouse.model';

@injectable()
export class WarehouseService {
  constructor(private repository: WarehouseRepository) {}

  async getAll(): Promise<IWarehouse[]> {
    return this.repository.getAll();
  }
}
