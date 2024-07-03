import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class CategoryRepository {
  constructor(private db: Database) {

  }
  async getAll(): Promise<any> {
    try {
      const sql = 'CALL GetAllCategory()';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getById(id: string): Promise<any> {
    try {
      const sql = 'CALL GetCategoryById(?)';
      const [results] = await this.db.query(sql, [id]);      
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } 
      return null; 
    } catch (error:any) {
      throw new Error( error.message);
      
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const sql = 'CALL HideCategory(?)';
      
      await this.db.query(sql, [id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }
  
  async update(cat: any): Promise<any> {
    try {
      const sql = 'CALL UpdateCategory(?, ?)';
      
      await this.db.query(sql, [cat.category_id, cat.category_name]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }
  async add(cat: any): Promise<any> {
    try {
      const sql = 'CALL AddCategory(?)';
      
      await this.db.query(sql, [ cat]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

}