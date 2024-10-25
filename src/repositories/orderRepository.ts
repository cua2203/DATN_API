import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class OrderRepository {
    constructor(private db: Database) {

    }

    async Create(order:any,order_detail:any) :Promise<any>{
        try{

            const sql = "call Create_Order(?,?)";
           let result= await this.db.query(sql,[order,order_detail]);

           console.log(result.affectedRows);
            return true;
        }

        catch(error:any){
            console.log(error.message);
            throw new Error(error.message);
         
        }
    }
    async getAll() :Promise<any>{
        try{

            const sql = "call getAllOrder()";
            const [data] = await this.db.query(sql,[]);
            if(Array.isArray(data) && data.length>0){
                return data
            }
            return false;
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }
    async getOrderDetail(id:string) :Promise<any>{
        try{
            const sql = "call getOrderDetail(?)" ;
            const [data] = await this.db.query(sql,[id]);
            if(Array.isArray(data) && data.length>0){
                return data
            }
            return false;
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }

    async getOrderTotal(fromDate:string,toDate:string) :Promise<any>{
        try{
            const sql = "call totalOrderPrice(?,?)" ;
            const [data] = await this.db.query(sql,[fromDate,toDate]);
           
            return data
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }
    async getOrderCount(fromDate:string,toDate:string) :Promise<any>{
        try{
            const sql = "call countOrder(?,?)" ;
            const [data] = await this.db.query(sql,[fromDate,toDate]);
      
          
            return data[0];
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }

    async getOrderById(id:string) :Promise<any>{
        try{
            const sql = "call getOrderById(?)" ;
            const [data] = await this.db.query(sql,[id]);
            if(Array.isArray(data) && data.length>0){
                return data[0]
            }
            return false;
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }
    async countOrder() :Promise<any>{
        try{
            const sql = "call countOrder()" ;
            const [data] = await this.db.query(sql,[]);
            if(Array.isArray(data) && data.length>0){
                return data
            }
            return false;
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }

    async Process(id:string) :Promise<any>{
        try{

            const sql = "Call UpdateOrderStatus(?)";
            const data = await this.db.query(sql,[id]);
           
            return false;
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }
    async Cancel(id:string) :Promise<any>{
        try{

            const sql = "Call CancelOrder(?)";
            const data = await this.db.query(sql,[id]);
            console.log(data);
            return false;
        }

        catch(error:any){
            throw new Error(error.message);
        }

    }

    async getOrderStatusByID(id: string):Promise<any>{
        try{

            let sql = 'call getOrderStatusLogById(?)';
            const [data] = await this.db.query(sql,[id]);
            if(Array.isArray(data) && data.length>0){
                return data
            }
            return false

        }catch(error:any){
            throw new Error(error.message);

        }
    }

    async getByCustomerID(id: string):Promise<any>{
        try{

            let sql = 'select * from orders where email = ?';
            const [data] = await this.db.query(sql,[id]);
            if(Array.isArray(data) && data.length>0){
                return data
            }
            return false

        }catch(error:any){
            throw new Error(error.message);

        }
    }

    async getDistinctOrderStatus(from:any,to:any):Promise<any>{
        try{

            let sql = 'call getDistinctOrderStatus(?,?)';
            const [data] = await this.db.query(sql,[from,to]);
            if(Array.isArray(data) && data.length>0){
                return data
            }
            return false

        }catch(error:any){
            throw new Error(error.message);

        }
    }

    async getorderByEmail(email:string):Promise<any>{
        try{

            let sql = 'select * from orders where email = ?  order by order_id desc limit 10';
            const data = await this.db.query(sql,[email]);
            return data
         

        }catch(error:any){
            throw new Error(error.message);

        }
    }

    async getCustomerByEmail(email:string):Promise<any>{
        try{

            let sql = 'select * from customer where email = ?';
            const data = await this.db.query(sql,[email]);
            return data
         

        }catch(error:any){
            throw new Error(error.message);

        }
    }

    async countProductSaled(from:any,to:any):Promise<any>{
        try{

            let sql = 'call countProductSaled(?,?)';
            const [data] = await this.db.query(sql,[from,to]);
            if(Array.isArray(data) && data.length>0){
                return data
            }
            return false

        }catch(error:any){
            throw new Error(error.message);

        }
    }

    async requestEmailOtp(email: string,otp:string):Promise<any>{
        try{

            let sql = 'call getCustomerByEmail(?,?)';
            const [data] = await this.db.query(sql,[email,otp]);
            
            if(data[0].result==1){
                return true
            }
            return false

        }catch(error:any){
            throw new Error(error.message);

        }
    }

    async verifyOtp(email: string,otp:string):Promise<any>{
        try{

            let sql = 'call verifyOtp(?,?)';
            const [data] = await this.db.query(sql,[otp,email]);
      
            return data[0].result

        }catch(error:any){
            throw new Error(error.message);

        }
    }




}