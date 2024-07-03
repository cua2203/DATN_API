import { Router } from 'express';
import 'reflect-metadata';
import categoryRouter from './categoryRouter';
import brandRouter from './brandRouter';
import userRouter from './userRouter';
import productRouter from './productRouter';
import { authenticate,authorization } from '../middlewares/authMiddleware';
import variantRouter from './variantRouter';
import orderRouter from './orderRouter';
import Uploadrouter from './uploadRouter';
import importRouter from './importRouter';
import commentRouter from './commentRouter';
import supplierRouter from './supplierRouter';
import warehouseRouter from './warehouseRouter';

const router = Router();

// authenticate,authorization(["Admin","User"])

router.use('/category', categoryRouter);
router.use('/brand', brandRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/variant', variantRouter);
router.use('/order', orderRouter);
router.use('/import', importRouter);
router.use('/upload', Uploadrouter);
router.use('/comment', commentRouter);
router.use('/supplier', supplierRouter);
router.use('/warehouse', warehouseRouter);


export default router;
  