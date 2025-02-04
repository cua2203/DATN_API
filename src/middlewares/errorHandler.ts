import { Request, Response, NextFunction } from 'express';
import logger from '../untils/logger';

// src/middlewares/errorHandler.js
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.error(`[ERROR] ${err.message}`);
  logger.error(
    `${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  // Log chi tiết lỗi trong quá trình phát triển
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({
      status: 'error',
      message: err.message,
      stack: err.stack,
    });
  }

  // Trong môi trường production, chỉ trả về thông báo ngắn gọn
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
