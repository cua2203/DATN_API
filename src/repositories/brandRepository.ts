import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { IBrand } from '../model/brand.model';

@injectable()
export class BrandRepository {
  constructor(private db: Database) {}

  async getAll(): Promise<IBrand[]> {
    const query = 'CALL GetAllBrand()';
    const [result] = await this.db.query(query, []);

    return result;
  }

  async getById(id: string): Promise<IBrand> {
    const sql = 'CALL GetBrandById(?)';
    const [result] = await this.db.query(sql, [id]);

    return result;
  }

  async delete(id: string): Promise<any> {
    const sql = 'CALL HideBrand(?)';
    return await this.db.query(sql, [id]);
  }

  async update(obj: IBrand): Promise<any> {
    const sql = 'CALL UpdateBrand(?, ?, ?)';
    return await this.db.query(sql, [
      obj.brand_id,
      obj.brand_name,
      obj.image,
    ]);
  }
  async add(obj: IBrand): Promise<any> {
    const sql = 'CALL AddBrand(?,?)';

    return await this.db.query(sql, [obj.brand_name, obj.image]);
  }
}
