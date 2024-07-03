import { injectable } from 'tsyringe';
import {BrandRepository } from '../repositories/brandRepository';


@injectable()
export class BrandService {
  constructor(private brand: BrandRepository) {
  }

  async getAll(): Promise<any> {
    return this.brand.getAll();
  }

  async getById(id: string): Promise<any> {
    return this.brand.getById(id);
  }
  async delete(id: string): Promise<any> {
    return this.brand.delete(id);
  }
  async add(cat:any): Promise<any> {
    return this.brand.add(cat);
  }
  async update(brand:any): Promise<any> {
    return this.brand.update(brand);
  }
}