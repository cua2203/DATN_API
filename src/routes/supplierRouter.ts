import { Router } from 'express';
import { container } from 'tsyringe';
import { SupplierController } from '../controllers/supplierController';

const supplierRouter = Router();
const supplierController = container.resolve(SupplierController);

supplierRouter.get(
  '/getAll',
  supplierController.getAll.bind(supplierController),
);
// supplierRouter.get('/getWithVariant', supplierController.getAllwithVariants.bind(supplierController));
// supplierRouter.get('/getById/:id', supplierController.getById.bind(supplierController));
// supplierRouter.delete('/delete/:id', supplierController.delete.bind(supplierController));
// supplierRouter.get('/export', supplierController.export.bind(supplierController));
// supplierRouter.post('/add', supplierController.add.bind(supplierController));
// supplierRouter.post('/import', supplierController.readExcelData.bind(supplierController));
// supplierRouter.put('/update', supplierController.update.bind(supplierController));

export default supplierRouter;
