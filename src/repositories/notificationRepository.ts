import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class NotificationRepository {
  // constructor(private db: Database) {

  // }

  async Create(data: any): Promise<any> {
    let db = new Database();
    let to_user = data.userId;
    let from_user = 'customer';
    let message = data.message;

    try {
      const sql = 'call createNotification(?,?,?)';
      await db.query(sql, [from_user, to_user, message]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async get(): Promise<any> {
    try {
      let db = new Database();
      const sql = 'call getNotificationById(?) ';
      let [result] = await db.query(sql, ['Admin']);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
