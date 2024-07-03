import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class BrandRepository {
    constructor(private db: Database) {

    }

    async getAll(): Promise<any> {
        try {
            const sql = 'CALL GetAllBrand()';
            const [results] = await this.db.query(sql, []);
            return results;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const sql = 'CALL GetBrandById(?)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);

        }
    }

    async delete(id: string): Promise<any> {
        try {
            const sql = 'CALL HideBrand(?)';

            await this.db.query(sql, [id]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(brand: any): Promise<any> {
        try {
            const sql = 'CALL UpdateBrand(?, ?, ?)';

            await this.db.query(sql, [brand.brand_id, brand.brand_name,brand.image]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async add(cat: any): Promise<any> {
        try {
            const sql = 'CALL AddBrand(?,?)';

            await this.db.query(sql, [cat.brand_name,cat.image]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


}
