import { Router } from "express";
import { container } from "tsyringe";

import { ImportBillController } from "../controllers/importBillController";

const importRouter = Router();
const orderController = container.resolve(ImportBillController);

importRouter.post('/create',orderController.Create.bind(orderController));
importRouter.post('/getByDate',orderController.getByDate.bind(orderController));
importRouter.get('/detail/:id',orderController.getImportBillDetail.bind(orderController));
importRouter.post('/total',orderController.totalImportPrice.bind(orderController));




export default importRouter;