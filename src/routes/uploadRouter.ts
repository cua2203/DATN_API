
import { Router } from 'express';
import UploadController from '../controllers/uploadController';
import UploadService from '../services/uploadService';

const uploadService = new UploadService();
const uploadController = new UploadController(uploadService);

const Uploadrouter = Router();

Uploadrouter.post('/single', (req, res) => {
  uploadController.uploadFile(req, res);
});
Uploadrouter.post('/multi', (req, res) => {
  uploadController.uploadMultiFiles(req, res);
});
Uploadrouter.post('/delete/:imagePath', (req, res) => {
  uploadController.deleteImage(req, res);
});
Uploadrouter.get('/getImage', (req, res) => {
  uploadController.getImage(req, res);
});

export default Uploadrouter;
