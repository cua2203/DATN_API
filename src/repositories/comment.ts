import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class CommentRepository {
  constructor(private db: Database) { }
 
  async Create(email:any,rate: number, text: any, laptop_id: any): Promise<any> {
    try {
      const sql = 'CALL create_comment(?,?,?,?)';
     let result = await this.db.query(sql, [email,rate, text, laptop_id] );
     console.log(result);
      return true;
    }
    catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<any> {
    try {
      const sql = 'CALL getComment()';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllPost(): Promise<any> {
    try {
      const sql = `select * from posts p join posts_tags pt on p.post_id = pt.post_id join tags t on pt.tag_id=t.tag_id limit 10;`;
      const results = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOnePost(id:any): Promise<any> {
    try {
      const sql = `select * from posts p join posts_tags pt on p.post_id = pt.post_id join tags t on pt.tag_id=t.tag_id where p.post_id = ?;`;
      const results = await this.db.query(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllPostTag(): Promise<any> {
    try {
      const sql = `select * from tags limit 6;`;
      const results = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById(id:number): Promise<any> {
    try {
      const sql = 'CALL GetCommentById(?)';
      const [results] = await this.db.query(sql, [id]);
      console.log(results);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

 
}