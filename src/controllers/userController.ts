import { Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";

import { injectable } from "tsyringe";
import { UserService } from "../services/userService";
import { generateToken } from "../config/jwt";
import argon2 from "argon2";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ rs: 0, message: "Vui lòng nhập đầy đủ thông tin" });
        return;
      }
      let userByEmail = await this.userService.GetOne(email);

      if(!userByEmail){
        res.status(400).json({rs: 0, message: "Sai tài khoản hoặc mật khẩu" });
        return;
      }
      let result = await argon2.verify(userByEmail?.password, password);
      if(!result){
        res.status(401).json({rs: 0, message: "Sai tài khoản hoặc mật khẩu" });
      }

        const user = await this.userService.authenticate(email, userByEmail?.password);
        const token = generateToken(user);
        user.token = token;
        user.password = null;

        res.json({rs:1, message: 'Thành công', data: user});

    } catch (error: any) {

      res.status(500).json({rs: 0, message: 'Lỗi phía server '});
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    try {
      const { fullname, email, phone, password } = req.body;
      let user = { fullname, email, phone, password };
      const results = await this.userService.Register(user);

      if (results) {
        res.json({ rs: true, message: "Đăng ký thành công !" });
      } else {
        res.json({ rs: false, message: "Tên tài khoản đã tồn tại !" });
      }
    } catch (error: any) {
      res.json({ rs: false, message: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const search_criteria = {
        searchString: req.query.searchString ? req.query.searchString : "",
        pageIndex: req.query.pageIndex,
        pageSize: req.query.pageSize,
      };

      const data = await this.userService.getAll(
        JSON.stringify(search_criteria)
      );
      if (data && data.length > 0) {
        res.json({ rs: true, message: "Thành công", data: data });
      } else {
        res.json({ rs: false, message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ rs: false, message: error.message });
    }
  }

  async getByID(req: Request, res: Response): Promise<void> {
    try {
      let id = req.params.id;

      const data = await this.userService.getByID(id);
      if (data) {
        res.json({ rs: true, message: "Thành công", data: data });
      } else {
        res.json({ rs: false, message: "Không lấy được thông tin" });
      }
    } catch (error: any) {
      res.json({ rs: false, message: error.message });
    }
  }

  async Hide(req: Request, res: Response): Promise<any> {
    try {
      this.userService.hide(req.params.id);
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
}
