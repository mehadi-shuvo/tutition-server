import express from 'express';
import validateRequest from '../../app/config/middlewares/validateRequest';
import {
  userLoginSchemaValidation,
  // userSchemaValidation,
} from './user.validation';
import { userController } from './user.controller';
// import auth from '../../app/config/middlewares/auth';
const router = express.Router();

// router.post(
//   '/register',
//   validateRequest(userSchemaValidation),
//   userController.createUser,
// );
router.post(
  '/login',
  validateRequest(userLoginSchemaValidation),
  userController.loginUser,
);
// router.post(
//   '/change-password',
//   auth('user', 'admin'),
//   //   validateRequest(userLoginSchemaValidation),
//   userController.changePassword,
// );
// router.get('/', categoryControllers.getAllCategories);

export const userRouter = router;
