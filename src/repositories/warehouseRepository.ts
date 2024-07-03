import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import {IWarehouse} from '../model/warehouse.model';

@injectable()
export class WarehouseRepository {
  constructor(private db: Database) { }

  async getAll(): Promise<IWarehouse[]> {
    try {
      const sql = 'CALL getAllWarehouse()';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
        throw new Error(error.message);
    }
  }
}