import express from 'express';
import authenticate from '../middleware/authenticate.middleware.js';
import authorize from '../middleware/authorize.middleware.js';
import validate from '../middleware/validate.middleware.js';
import * as lessonController from '../controllers/lessons.controller.js';
import * as lessonSchemas from '../validations/lesson.validate.js';

const router = express.Router();

//get all lessons by course Id
router.get('/getAllLessons/:courseId',authenticate,authorize(['instructor','student']),
                        validate(lessonSchemas.getAllLessons,(req)=>({...req.params})),
                        lessonController.getAllLessons);            
//get lesson by Id
router.get('/getLesson/:id',authenticate,authorize(['instructor','student']),
                        validate(lessonSchemas.getLesson,(req)=>({...req.params})),
                        lessonController.getLesson);

//create lesson
router.post('/createLesson',authenticate,authorize(['instructor']),
                        validate(lessonSchemas.createLesson,(req)=>({...req.body})),
                        lessonController.createLesson);
                        
//update lesson
router.put('/updateLesson/:id',authenticate,authorize(['instructor']),
                        validate(lessonSchemas.updateLesson,(req)=>({...req.body,...req.params})),
                        lessonController.updateLesson);

//delete lesson
router.delete('/deleteLesson/:id',authenticate,authorize(['instructor']),
                        validate(lessonSchemas.deleteLesson,(req)=>({...req.params})),
                        lessonController.deleteLesson);

export default router;