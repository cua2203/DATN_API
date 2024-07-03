import { injectable } from 'tsyringe';
import { NotificationRepository } from '../repositories/notificationRepository'; 


@injectable()
export class NotificationService {
  constructor(private repository: NotificationRepository) {

  }

  async Create(data:any): Promise<any> {
    return this.repository.Create(data);
  }

  async getAll(): Promise<any> {
    try {
      return this.repository.get();
      
    } catch (error:any) {
      throw new Error(error);
       
    }
  }

}