import { Router } from 'express';
import { container } from 'tsyringe';
import { CommentController } from '../controllers/comment';

const commentRouter = Router();
const commentController = container.resolve(CommentController);

commentRouter.get('/getAll', commentController.getAll.bind(commentController));
commentRouter.get(
  '/getById/:id',
  commentController.getById.bind(commentController),
);
commentRouter.post('/create', commentController.add.bind(commentController));
commentRouter.get(
  '/get_notification',
  commentController.getNotification.bind(commentController),
);

commentRouter.get('/post', commentController.getPost.bind(commentController));
commentRouter.get(
  '/tags',
  commentController.getAllPostTag.bind(commentController),
);
commentRouter.get(
  '/post/:id',
  commentController.getOnePost.bind(commentController),
);

export default commentRouter;
