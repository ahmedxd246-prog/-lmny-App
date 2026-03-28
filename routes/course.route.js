import express from 'express';
import authenticate from '../middleware/authenticate.middleware.js';
import authorize from '../middleware/authorize.middleware.js';
import validate from '../middleware/validate.middleware.js';
import * as courseController from '../controllers/course.controller.js';
import * as courseSchemas from '../validations/course.validate.js';

const router = express.Router();
//get all courses
router.get(
  '/getAllCourses/:categoryId',
  authenticate,
  authorize(['instructor', 'student']),
  validate(courseSchemas.getAllCourses, (req) => ({ ...req.params })),
  courseController.getAllCourses,
);

//get course by id
router.get(
  '/getCourse/:id',
  authenticate,
  authorize(['instructor', 'student']),
  validate(courseSchemas.getCourse, (req) => ({ ...req.params })),
  courseController.getCourseById,
);

//get all courses by instructor
router.get(
  '/getAllCoursesRelatedToInstructor/:instructorId',
  authenticate,
  authorize(['instructor', 'student']),
  validate(courseSchemas.getAllCoursesRelatedToInstructor, (req) => ({
    ...req.params,
  })),
  courseController.getAllCoursesRelatedToInstructor,
);

//create course
router.post(
  '/createCourse',
  authenticate,
  authorize(['instructor']),
  validate(courseSchemas.createCourse, (req) => ({ ...req.body })),
  courseController.createCourse,
);

//update course
router.put(
  '/updateCourse/:id',
  authenticate,
  authorize(['instructor']),
  validate(courseSchemas.updateCourse, (req) => ({
    ...req.body,
    ...req.params,
  })),
  courseController.updateCourse,
);

//delete course
router.delete(
  '/deleteCourse/:id',
  authenticate,
  authorize(['instructor']),
  validate(courseSchemas.deleteCourse, (req) => ({ ...req.params })),
  courseController.deleteCourse,
);

export default router;
