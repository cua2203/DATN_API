import { Router } from 'express';
import { container } from 'tsyringe';
import { BrandController } from '../controllers/brandController';


const brandRouter = Router();
const brandController = container.resolve(BrandController);

brandRouter.get('/getAll', brandController.getAll.bind(brandController));
brandRouter.get('/getById/:id', brandController.getById.bind(brandController));
brandRouter.delete('/delete/:id', brandController.delete.bind(brandController));
brandRouter.post('/add', brandController.add.bind(brandController));
brandRouter.post('/update', brandController.update.bind(brandController));

export default brandRouter;
