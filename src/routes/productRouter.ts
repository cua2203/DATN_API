import { Router } from 'express';
import { container } from 'tsyringe';
import { ProductController } from '../controllers/productController';


const productRouter = Router();
const productController = container.resolve(ProductController);

productRouter.get('/getAll', productController.getAll.bind(productController));
productRouter.get('/getWithVariant/:id', productController.getAllwithVariants.bind(productController));
productRouter.get('/getById/:id', productController.getById.bind(productController));
productRouter.delete('/delete/:id', productController.delete.bind(productController));
productRouter.get('/export', productController.export.bind(productController));
productRouter.post('/add', productController.add.bind(productController));
productRouter.post('/import', productController.readExcelData.bind(productController));
productRouter.put('/update', productController.update.bind(productController));

export default productRouter;
// /:searchString/:pageIndex/:pageSize