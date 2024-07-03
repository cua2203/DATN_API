import { injectable } from 'tsyringe';
import { CommentRepository } from '../repositories/comment';


@injectable()
export class CommentService {
  constructor(private service: CommentRepository) {
  }

  async getAll(): Promise<any> {
    return this.service.getAll();
  }
  async getById(id:number): Promise<any> {
    return this.service.getById(id);
  }


  async add(email:any,rate: number, text: any, laptop_id: any): Promise<any> {
    return this.service.Create(email,rate, text, laptop_id);
  }

  async getAllPost(): Promise<any> {
    return this.service.getAllPost();
  }

  async getAllPostTag(): Promise<any> {
    return this.service.getAllPostTag();
  }

  async getOnePost(id: any): Promise<any> {
    return this.service.getOnePost(id);
  }


}