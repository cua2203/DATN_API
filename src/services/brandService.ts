import { injectable } from 'tsyringe';
import { BrandRepository } from '../repositories/brandRepository';
import { IBrand } from '../model/brand.model';

@injectable()
export class BrandService {
  constructor(private brand: BrandRepository) {}

  async getAll(): Promise<IBrand[]> {
    return await this.brand.getAll();
  }

  async getById(id: string): Promise<IBrand> {
    return this.brand.getById(id);
  }
  async delete(id: string): Promise<any> {
    return this.brand.delete(id);
  }
  async add(obj: IBrand): Promise<any> {
    return this.brand.add(obj);
  }
  async update(obj: IBrand): Promise<any> {
    return this.brand.update(obj);
  }
}
