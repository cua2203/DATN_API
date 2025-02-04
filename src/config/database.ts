import { injectable } from 'tsyringe';
import { Pool, PoolConnection, createPool } from 'mysql2/promise';
require('dotenv').config();
// Cấu hình kết nối MySQL
const connectionConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

@injectable()
export class Database {
  private pool: Pool;
  constructor() {
    this.pool = createPool(connectionConfig);
  }
  public async query(sql: string, values: any[]): Promise<any> {
    let connection: PoolConnection | null = null;
    try {
      connection = await this.pool.getConnection();
      const [result] = await connection.query(sql, values);
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
