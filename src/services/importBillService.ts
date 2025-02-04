import { injectable } from 'tsyringe';
import { ImportBillRepository } from '../repositories/importBillRepository';

@injectable()
export class ImportBillService {
  constructor(private repository: ImportBillRepository) {}

  async Create(bill: any): Promise<any> {
    return this.repository.Create(bill);
  }
  async getByDate(fromDate: string, toDate: string): Promise<any> {
    return this.repository.getByDate(fromDate, toDate);
  }

  async getImportBillDetail(id: Number): Promise<any> {
    return this.repository.getImportBillDetail(id);
  }
  async totalImportPrice(to: String, from: String): Promise<any> {
    return this.repository.totalImportPrice(to, from);
  }


}
