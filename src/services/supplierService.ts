import { injectable } from 'tsyringe';
import { SupplierRepository } from '../repositories/supplierRepository';
import { ISupplier } from '../model/supplier.model';

@injectable()
export class SupplierService {
  constructor(private service: SupplierRepository) {}

  async getAll(): Promise<ISupplier[]> {
    return this.service.getAll();
  }
}
