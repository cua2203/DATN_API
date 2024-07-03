import { Router } from 'express';
import { container } from 'tsyringe';
import { WarehouseController } from '../controllers/warehouseController';


const warehouseRouter = Router();
const warehouseController = container.resolve(WarehouseController);

warehouseRouter.get('/getAll', warehouseController.getAll.bind(warehouseController));
// warehouseRouter.get('/getWithVariant', warehouseController.getAllwithVariants.bind(warehouseController));
// warehouseRouter.get('/getById/:id', warehouseController.getById.bind(warehouseController));
// warehouseRouter.delete('/delete/:id', warehouseController.delete.bind(warehouseController));
// warehouseRouter.get('/export', warehouseController.export.bind(warehouseController));
// warehouseRouter.post('/add', warehouseController.add.bind(warehouseController));
// warehouseRouter.post('/import', warehouseController.readExcelData.bind(warehouseController));
// warehouseRouter.put('/update', warehouseController.update.bind(warehouseController));

export default warehouseRouter;
