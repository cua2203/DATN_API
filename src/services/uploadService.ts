
import { Request, Response, request } from 'express';
import multer from 'multer';
import path from 'path';
const fs = require('fs');



class UploadService {
  uploadFile(req :Request, res : Response, des: any) {

    const uploadDirectory = 'uploads/'+des;
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
   
    const storage = multer.diskStorage({

      destination: (req, file, cb) => {
        cb(null, uploadDirectory);
      },
      filename: (req, file, cb) => {
        const filename = `${Date.now()}${file.originalname}`;
        cb(null, filename);
      },
    });

    const upload = multer({ storage }).single('file');

    upload(req, res, (err) =>{
   
      if (err) {
        return res.status(400).send(err);
      }
      if (req.file) {
        const filePath = path.join(__dirname, uploadDirectory, req.file.filename);
        return res.status(200).json({filename:req.file.filename});
      } else {
        return res.status(400).send('No file uploaded.');
      }
     
    });
  };

  uploadMultiFiles(req :Request, res : Response, des: any) {

    const uploadDirectory = 'uploads/'+des;
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    const storage = multer.diskStorage({

      destination: (req, file, cb) => {
        cb(null, uploadDirectory);
      },
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });

    const upload = multer({ storage }).array('files',6);

    upload(req, res, (err) =>{
   
      if (err) {
        return res.status(400).send({err:err});
      }

      return res.status(200).json("Success!");
    });
  }
}

export default UploadService;
