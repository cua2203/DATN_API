import { Router } from 'express';
import { container } from 'tsyringe';
import { CategoryController } from '../controllers/categoryController';
import { authenticate, authorization } from '../middlewares/authMiddleware';


const categoryRouter = Router();
const categoryController = container.resolve(CategoryController);

categoryRouter.get('/getAll', categoryController.getAll.bind(categoryController));
categoryRouter.get('/getById/:id', categoryController.getById.bind(categoryController));
categoryRouter.delete('/delete/:id',authenticate,authorization(["Admin","User"]), categoryController.delete.bind(categoryController));
categoryRouter.post('/add',authenticate,authorization(["Admin","User"]), categoryController.add.bind(categoryController));
categoryRouter.post('/update',authenticate,authorization(["Admin","User"]), categoryController.update.bind(categoryController));

export default categoryRouter;
