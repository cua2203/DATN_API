import { Router } from 'express';
import { container } from 'tsyringe';
import { CategoryController } from '../controllers/categoryController';
import { authenticate, authorization } from '../middlewares/authMiddleware';

const categoryRouter = Router();
const categoryController = container.resolve(CategoryController);

categoryRouter.get('/', categoryController.getAll.bind(categoryController));
categoryRouter.get('/:id', categoryController.getById.bind(categoryController));
categoryRouter.delete(
  '/:id',
  authenticate,
  authorization(['Admin', 'User']),
  categoryController.delete.bind(categoryController),
);
categoryRouter.post(
  '/',
  authenticate,
  authorization(['Admin', 'User']),
  categoryController.add.bind(categoryController),
);
categoryRouter.put(
  '/',
  authenticate,
  authorization(['Admin', 'User']),
  categoryController.update.bind(categoryController),
);

export default categoryRouter;
