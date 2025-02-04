import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class ImportBillRepository {
  constructor(private db: Database) {}

  async Create(bill: any): Promise<any> {
    try {
      let user_id = bill.user_id;
      let warehouse_id = bill.warehouse_id;
      let supplier_id = bill.supplier_id;
      let laptop_list = JSON.stringify(bill.blocks);

      const sql = 'call AddImportBill(?,?,?,?)';
      await this.db.query(sql, [
        supplier_id,
        user_id,
        warehouse_id,
        laptop_list,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getByDate(fromDate: string, toDate: string): Promise<any> {
    try {
      const sql = 'call GetImportBillByDate(?,?)';
      let [result] = await this.db.query(sql, [fromDate, toDate]);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getImportBillDetail(id: Number): Promise<any> {
    try {
      const sql = 'call GetImportBillDetail(?)';
      let [result] = await this.db.query(sql, [id]);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async totalImportPrice(to: String, from: String): Promise<any> {
    try {
      const sql = 'call totalImport(?,?)';
      let [result] = await this.db.query(sql, [to, from]);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
