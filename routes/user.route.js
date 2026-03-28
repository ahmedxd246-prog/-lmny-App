import express from 'express';
import authenticate from '../middleware/authenticate.middleware.js';
import authorize from '../middleware/authorize.middleware.js';
import validate from '../middleware/validate.middleware.js';
import * as userController from '../controllers/user.controller.js';
import * as userSchemas from '../validations/user.validate.js';

const router = express.Router();

//get all users
router.get(
  '/getAllStudents/:courseId',
  authenticate,
  authorize(['instructor']),
  validate(userSchemas.validateGetAllUsers, (req) => ({ ...req.params })),
  userController.getAllStudents,
);

//get student by Id
router.get(
  '/getStudent/:id',
  authenticate,
  authorize(['instructor']),
  validate(userSchemas.validateGetUser, (req) => ({ ...req.params })),
  userController.getStudentById,
);

//update student
router.put(
  '/updateUser/:id',
  authenticate,
  authorize(['instructor', 'student']),
  validate(userSchemas.validateUpdateUser, (req) => ({
    ...req.body,
    ...req.params,
  })),
  userController.updateUser,
);

//delete student
router.delete(
  '/deleteUser/:id',
  authenticate,
  authorize(['instructor']),
  validate(userSchemas.validateDeleteUser, (req) => ({ ...req.params })),
  userController.deleteUser,
);

export default router;
