import { injectable } from 'tsyringe';
import { CategoryRepository } from '../repositories/categoryRepository';
import { Icategory } from '../model/category.model';

@injectable()
export class CategoryService {
  constructor(private category: CategoryRepository) {}

  async getAll(): Promise<Icategory[]> {
    return this.category.getAll();
  }

  async getById(id: string): Promise<Icategory> {
    return this.category.getById(id);
  }
  async delete(id: string): Promise<any> {
    return this.category.delete(id);
  }
  async add(obj: Icategory): Promise<any> {
    return this.category.add(obj);
  }
  async update(obj: Icategory): Promise<any> {
    return this.category.update(obj);
  }
}
