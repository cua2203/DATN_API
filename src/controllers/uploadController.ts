
import { Request, Response } from 'express';
import UploadService from '../services/uploadService';

const path = require('path');
const fs = require('fs');

require('dotenv').config();

let imagePath = process.env.IMAGE_PATH;
class UploadController {
  private uploadService: UploadService;

  constructor(uploadService: UploadService) {
    this.uploadService = uploadService;
  }

  uploadFile(req: Request, res: Response) {
    const des = req.query.des;
    this.uploadService.uploadFile(req, res,des);
  }

  uploadCloudinary(req: Request, res: Response){
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file);
  
    res.status(200).json({
      rs:1,
      message: 'File uploaded successfully',
      url: req.file.path,
      file: req.file

    });
  }

  uploadMultiFiles(req: Request, res: Response) {
    const des = req.query.des;
    this.uploadService.uploadMultiFiles(req, res,des);
  }

  getImage(req:Request, res: Response){
    const imageDirectory = imagePath;

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
    const imageDirectory = process.env.IMAGE_PATH;
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
