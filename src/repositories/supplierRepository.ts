import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { ISupplier } from '../model/supplier.model';

@injectable()
export class SupplierRepository {
  constructor(private db: Database) {}

  async getAll(): Promise<ISupplier[]> {
    try {
      const sql = 'CALL getAllSupplier()';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
