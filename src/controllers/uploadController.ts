
import { Request, Response } from 'express';
import UploadService from '../services/uploadService';
import { config } from '../config/config';
const path = require('path');
const fs = require('fs');

class UploadController {
  private uploadService: UploadService;

  constructor(uploadService: UploadService) {
    this.uploadService = uploadService;
  }

  uploadFile(req: Request, res: Response) {
    const des = req.query.des;
    this.uploadService.uploadFile(req, res,des);
  }

  uploadMultiFiles(req: Request, res: Response) {
    const des = req.query.des;
    this.uploadService.uploadMultiFiles(req, res,des);
  }

  getImage(req:Request, res: Response){
    const imageDirectory = config.imagePath;

    fs.readdir(imageDirectory, (err:any, files:File[]) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error reading image directory');
      }
      // Lọc chỉ lấy các file ảnh (ví dụ: jpg, png)
      const imageFiles = files.filter((file:File) => {
        return ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase());
      });
      res.json(imageFiles);
    });
  }

  deleteImage(req:Request, res: Response){
    const imageDirectory = config.imagePath;
    const imagePath = path.join(imageDirectory, req.params.imagePath);
    // Sử dụng fs.unlink để xóa ảnh
    fs.unlink(imagePath, (err:any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({message:'Error deleting image'});
      }
  
      res.json({message:'ok'});
    });
  }
}

export default UploadController;
