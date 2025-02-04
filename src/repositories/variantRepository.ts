import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class VariantRepository {
  constructor(private db: Database) {}

  async getAll(): Promise<any> {
    try {
      const sql = 'CALL GetAllVariant()';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllWthPrice(): Promise<any> {
    try {
      const sql = 'CALL getAllWithoutPrice()';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllPaging(search_criteria: any): Promise<any> {
    try {
      const sql = 'CALL SearchLaptop(?)';
      const [results] = await this.db.query(sql, [search_criteria]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById(id: string): Promise<any> {
    try {
      const sql = 'CALL GetVariantById(?)';
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getByLaptopId(id: string): Promise<any> {
    try {
      const sql = 'CALL getVariantByProductId(?)';
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getNewEst(number: Number): Promise<any> {
    try {
      const sql = 'CALL getTop5VariantNewest(?)';
      const [results] = await this.db.query(sql, [number]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getTopSelling(number: Number): Promise<any> {
    try {
      const sql = 'CALL getTopSellingVariant(?)';
      const [results] = await this.db.query(sql, [number]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const sql = 'CALL HideVariant(?)';

      await this.db.query(sql, [id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(laptop: any): Promise<any> {
    try {
      const sql = 'CALL UpdateVariant(?)';

      await this.db.query(sql, [laptop]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async add(laptop: any): Promise<any> {
    try {
      const sql = 'CALL AddVariant(?)';

      await this.db.query(sql, [laptop]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
