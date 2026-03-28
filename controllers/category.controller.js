import * as categoryService from '../services/category.service.js';
import catchAsync  from '../utils/catchAsync.util.js';
import AppError  from '../utils/appError.util.js';

//get all categories
export const getAllCategories = catchAsync(async(req,res,next)=>{
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
        status: 'success',
        data: categories
    });
})

//get category by id
export const getCategoryById = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const category = await categoryService.getCategoryById(id);
    if(!category){
        return next(new AppError('Category not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: category
    });
})

//create new category
export const createCategory = catchAsync(async(req,res,next)=>{
    const {name} = req.body;
    await categoryService.createCategory(name);
    res.status(201).json({
        status: 'success',
        message: 'Category created successfully'
    });
})

//update category
export const updateCategory = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const {name} = req.body;
    await categoryService.updateCategory(id, name);
    res.status(200).json({
        status: 'success',
        message: 'Category updated successfully'
    });
})

//destroy category
export const deleteCategory = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    await categoryService.deleteCategory(id);
    res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully'
    });
})