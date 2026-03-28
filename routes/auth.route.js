import express from 'express';
import validate from '../middleware/validate.middleware.js';
import * as authController from '../controllers/auth.controller.js';
import * as authSchemas from '../validations/user.validate.js';

const router = express.Router();

//register
router.post(
  '/register',
  validate(authSchemas.validateRegister),
  authController.register,
);

//login
router.post(
  '/login',
  validate(authSchemas.validateLogin),
  authController.login,
);

//activate account
router.get(
  '/activateAccount',
  validate(authSchemas.validateActivateAccount, (req) => ({ ...req.params })),
  authController.activateAccount,
);

//forget password
router.post(
  '/forgetPassword',
  validate(authSchemas.validateForgetPassword),
  authController.forgetpassword,
);

//reset password
router.post(
  '/resetPassword',
  validate(authSchemas.validateResetPassword, (req) => ({
    ...req.body,
    ...req.params,
  })),
  authController.resetPassword,
);

//generate access token
router.post(
  '/generateAccessToken',
  validate(authSchemas.validatetGenerateAT, (req) => ({ ...req.cookies })),
  authController.refreshToken,
);

export default router;
