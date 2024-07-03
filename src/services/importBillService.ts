import { injectable } from 'tsyringe';
import { ImportBillRepository } from '../repositories/importBillRepository';


@injectable()
export class ImportBillService {
  constructor(private repository: ImportBillRepository) {

  }

  async Create(bill:any): Promise<any> {
    return this.repository.Create(bill);
  }
  async getByDate(fromDate:string, toDate:string):Promise<any>{
    return this.repository.getByDate(fromDate, toDate);
  }

  async getImportBillDetail(id:Number):Promise<any>{
    return this.repository.getImportBillDetail(id);
  }
  async totalImportPrice(to:String,from:String):Promise<any>{
    return this.repository.totalImportPrice(to,from);
  }

  // async getOrderDetail(id:string):Promise<any>{
  //   return this.repository.getOrderDetail(id);
  // }
  // async Process(id:string):Promise<any>{
  //   return this.repository.Process(id);
  // }

  // async Cancel(id:string):Promise<any>{
  //   return this.repository.Cancel(id);
  // }

//   async getById(id: string): Promise<any> {
//     return this.repository.getById(id);
//   }
//   async delete(id: string): Promise<any> {
//     return this.repository.delete(id);
//   }
//   async add(laptop:any): Promise<any> {
//     return this.repository.add(laptop);
//   }
//   async update(laptop:any): Promise<any> {
//     return this.repository.update(laptop);
//   }
}