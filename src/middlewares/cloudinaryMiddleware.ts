require('dotenv').config();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // Cấu hình lưu trữ Cloudinary cho multer
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Thư mục lưu trên Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req:Request, file: any) => file.originalname.split('.')[0],
    },
  });
  
 export const upload = multer({ storage: storage });

