import * as userService from '../services/auth.service.js';
import AppError from '../utils/appError.util.js';
import catchAsync from '../utils/catchAsync.util.js';

export const getAllStudents = catchAsync(async(req,res,next)=>{
    const {courseId} = req.params;
    const students = await userService.getAllUsers(courseId);
    return res.status(200).json({
        success:true,
        data:students
    });
});

export const getStudentById = catchAsync(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if(!user) return next(new AppError('user not found',404));
    return res.status(200).json({
        success:true,
        data:user
    });
});

export const updateUser = catchAsync(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userService.updateUser(id,req.body);
    if(!user) return next(new AppError('user not found',404));
    return res.status(200).json({
        success:true,
        data:user
    });
});

export const deleteUser = catchAsync(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userService.softDeleteUser(id);
    if(!user) return next(new AppError('user not found',404));
    return res.status(200).json({
        success:true,
        data:user
    });
})