import { injectable } from 'tsyringe';
import argon2 from 'argon2';
import { UserRepository } from '../repositories/userRepository';

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository
  ) {}
  async authenticate(username: string, password: string): Promise<any> {     
    let user = await this.userRepository.GetUserByAccount(username, password);
    // if (user) { 
    //   return {
    //     user_id: user.user_id,
    //     hoten: user.hoten,
    //     username: user.username 
    //   };
    // }
    // return null;
    return user
  }
  

  async Register(user:any):Promise<any>{
    let password=await this.hashPassword(user.password);

    user.password=password;
    
    return await this.userRepository.Register(user);
  }

  async getAll(search:any):Promise<any>{
    return this.userRepository.getAll(search);
  }
  async GetOne(search:any):Promise<any>{
    return this.userRepository.GetOne(search);
  }
  async hide(id:any):Promise<any>{
    return this.userRepository.hide(id);
  }

  async getByID(id:any):Promise<any>{
    return this.userRepository.getById(id);
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await argon2.hash(password);
      console.log(hashedPassword)
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }

}