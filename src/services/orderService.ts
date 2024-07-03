import { injectable } from 'tsyringe';
import { OrderRepository } from '../repositories/orderRepository';


@injectable()
export class OrderService {
  constructor(private repository: OrderRepository) {

  }

  async Create(order:any,order_detail:any): Promise<any> {
    return this.repository.Create(order,order_detail);
  }
  async getAll():Promise<any>{
    return this.repository.getAll();
  }
  async getOrderTotal(fromDate:string,toDate:string):Promise<any>{
    return this.repository.getOrderTotal(fromDate,toDate);
  }
  async getOrderCount(fromDate:string,toDate:string):Promise<any>{
    return this.repository.getOrderCount(fromDate,toDate);
  }

  async getOrderDetail(id:string):Promise<any>{
    return this.repository.getOrderDetail(id);
  }
  async getOrderById(id:string):Promise<any>{
    return this.repository.getOrderById(id);
  }
  async Process(id:string):Promise<any>{
    return this.repository.Process(id);
  }

  async Cancel(id:string):Promise<any>{
    return this.repository.Cancel(id);
  }

  async getOrderStatusByID(id:string):Promise<any>{
    return this.repository.getOrderStatusByID(id);
  }

  async getByCustomerID(id:string):Promise<any>{
    return this.repository.getByCustomerID(id);
  }
  async getDistinctOrderStatus(from:any,to:any):Promise<any>{
    return this.repository.getDistinctOrderStatus(from,to);
  }
  async countProductSaled(from:any,to:any):Promise<any>{
    return this.repository.countProductSaled(from,to);
  }
  async requestEmailOtp(email:string,otp:string):Promise<any>{
    return this.repository.requestEmailOtp(email,otp);
  }

  async verifyOtp(email:string,otp:string):Promise<any>{
    let verifyOtp = await this.repository.verifyOtp(email,otp);
    console.log(verifyOtp);

    if(verifyOtp===1){
       let data = await this.repository.getorderByEmail(email);
        console.log(data)
       return {rs:true,message:'Thành công !',data:data}
    }

    return {rs:false,message:'Mã OTP không chính xác!'}
  }

  async getorderByEmail(email:string):Promise<any>{
    return this.repository.getorderByEmail(email);
  }

  async getCustomerByEmail(email:string):Promise<any>{
    return this.repository.getCustomerByEmail(email);
  }


  

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