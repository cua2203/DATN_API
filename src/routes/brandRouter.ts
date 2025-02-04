import { Router } from 'express';
import { container } from 'tsyringe';
import { BrandController } from '../controllers/brandController';

const brandRouter = Router();
const brandController = container.resolve(BrandController);

brandRouter.get('/', brandController.getAll.bind(brandController));
brandRouter.get('/:id', brandController.getById.bind(brandController));
brandRouter.delete('/:id', brandController.delete.bind(brandController));
brandRouter.post('/', brandController.add.bind(brandController));
brandRouter.put('/', brandController.update.bind(brandController));

export default brandRouter;
