import { injectable } from 'tsyringe';
import { CategoryRepository } from '../repositories/categoryRepository';


@injectable()
export class CategoryService {
  constructor(private category: CategoryRepository) {

  }

  async getAll(): Promise<any> {
    return this.category.getAll();
  }

  async getById(id: string): Promise<any> {
    return this.category.getById(id);
  }
  async delete(id: string): Promise<any> {
    return this.category.delete(id);
  }
  async add(cat:any): Promise<any> {
    return this.category.add(cat);
  }
  async update(cat:any): Promise<any> {
    return this.category.update(cat);
  }
}