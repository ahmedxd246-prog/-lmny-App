import express from 'express';
import authenticate from '../middleware/authenticate.middleware.js';
import authorize from '../middleware/authorize.middleware.js';
import validate from '../middleware/validate.middleware.js';
import * as categoryController from '../controllers/category.controller.js';
import * as categorySchemas from '../validations/category.validate.js';

const router = express.Router();

//get all categories
router.get('/getAllCategories',authenticate,authorize(['instructor','student']),
                        categoryController.getAllCategories);
                        
//get category by id
router.get('/getCategory/:id',authenticate,authorize(['instructor','student']),
                        validate(categorySchemas.getCategory,(req)=>({...req.params})),
                        categoryController.getCategoryById);
                        
//create category
router.post('/createCategory',authenticate,authorize(['instructor']),
                        validate(categorySchemas.createCategory,(req)=>({...req.body})),
                        categoryController.createCategory);
                        
//update category
router.put('/updateCategory/:id',authenticate,authorize(['instructor']),
                        validate(categorySchemas.updateCategory,(req)=>({...req.body,...req.params})),
                        categoryController.updateCategory);
                        
//delete category
router.delete('/deleteCategory/:id',authenticate,authorize(['instructor']),
                        validate(categorySchemas.deleteCategory,(req)=>({...req.params})),
                        categoryController.deleteCategory);
                        

export default router;