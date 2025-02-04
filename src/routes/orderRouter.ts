import { Router } from 'express';
import { container } from 'tsyringe';
import { OrderController } from '../controllers/orderController';

const orderRouter = Router();
const orderController = container.resolve(OrderController);

orderRouter.post('/create', orderController.Create.bind(orderController));

orderRouter.get('/getAll', orderController.getAll.bind(orderController));

orderRouter.post('/count', orderController.getOrderCount.bind(orderController));

orderRouter.post('/total', orderController.getOrderTotal.bind(orderController));

orderRouter.get(
  '/getById/:id',
  orderController.getOrderById.bind(orderController),
);

orderRouter.get(
  '/OrderDetail/:id',
  orderController.getOrderDetail.bind(orderController),
);

orderRouter.put('/process/:id', orderController.Process.bind(orderController));

orderRouter.put('/cancel/:id', orderController.Cancel.bind(orderController));

orderRouter.post('/sendMail', orderController.sendMail.bind(orderController));

orderRouter.get(
  '/status/:id',
  orderController.getOrderStatusByID.bind(orderController),
);

orderRouter.get(
  '/customer/:id',
  orderController.getByCustomerID.bind(orderController),
);

orderRouter.post(
  '/getDistinctOrderStatus',
  orderController.getDistinctOrderStatus.bind(orderController),
);

orderRouter.post(
  '/countProductSaled',
  orderController.countProductSaled.bind(orderController),
);

orderRouter.post(
  '/requestEmailOtp',
  orderController.requestEmailOtp.bind(orderController),
);

orderRouter.post(
  '/verifyEmailOrder',
  orderController.verifyOtp.bind(orderController),
);

orderRouter.post(
  '/get_by_email',
  orderController.getByEmail.bind(orderController),
);

orderRouter.post(
  '/get_customer_by_email',
  orderController.getCustomerByEmail.bind(orderController),
);

export default orderRouter;
