import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class ProductRepository {
  constructor(private db: Database) {}

  async getAll(): Promise<any> {
    const sql = 'CALL GetAllProduct()';
    const [result] = await this.db.query(sql, []);
    return result;
  }
  async getAllwithVariants(id: any): Promise<any> {
    const sql = 'CALL get_products_with_variants(?)';
    const [result] = await this.db.query(sql, [id]);
    return result;
  }

  async getById(id: string): Promise<any> {
    const sql = 'CALL GetLaptopById(?)';
    const [result] = await this.db.query(sql, [id]);
    return result[0];
  }

  async delete(id: string): Promise<any> {
    const sql = 'CALL HideProduct(?)';

    return await this.db.query(sql, [id]);
  }

  async update(laptop: any): Promise<any> {
    const sql = 'CALL UpdateLaptop(?)';

    return await this.db.query(sql, [laptop]);
  }
  async add(laptop: any): Promise<any> {
    const sql = 'CALL AddLaptop(?)';

    return await this.db.query(sql, [laptop]);
  }
}
