import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Icategory } from '../model/category.model';

@injectable()
export class CategoryRepository {
  constructor(private db: Database) {}
  async getAll(): Promise<Icategory[]> {
    const sql = 'CALL GetAllCategory()';
    const [result] = await this.db.query(sql, []);
    return result;
  }
  async getById(id: string): Promise<Icategory> {
    const sql = 'CALL GetCategoryById(?)';
    const [result] = await this.db.query(sql, [id]);
    return result;
  }

  async delete(id: string): Promise<any> {
    const sql = 'CALL HideCategory(?)';

    return await this.db.query(sql, [id]);
  }

  async update(obj: Icategory): Promise<any> {
    const sql = 'CALL UpdateCategory(?, ?)';

    return await this.db.query(sql, [obj.category_id, obj.category_name]);
  }
  async add(obj: Icategory): Promise<any> {
    const sql = 'CALL AddCategory(?)';

    return await this.db.query(sql, [obj]);
  }
}
