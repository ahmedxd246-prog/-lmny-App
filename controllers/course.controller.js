import catchAsync from '../utils/catchAsync.util.js';
import * as courseService from '../services/course.service.js';

// get ALl courses
export const getAllCourses = catchAsync(async(req,res,next)=>{
    const courses = await courseService.getAllCourses(req.params.categoryId);
    res.status(200).json({
        status:'success',
        data:courses
    });
});

//get course by Id
export const getCourseById = catchAsync(async(req,res,next)=>{
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json({
        status:'success',
        data:course
    });
});

//get all courses by instructor
export const getAllCoursesRelatedToInstructor = catchAsync(async(req,res,next)=>{
    const courses = await courseService.getAllCoursesRelatedToInstructor(req.params.instructorId);
    res.status(200).json({
        status:'success',
        data:courses
    });
})

//create course
export const createCourse = catchAsync(async(req,res,next)=>{
    const {title,description,price,thumbnail,instructorId} = req.body;
    const course = await courseService.createCourse({title,description,price,thumbnail,instructorId});
    res.status(201).json({
        status:'success',
        data:course
    });
});

//update course
export const updateCourse = catchAsync(async(req,res,next)=>{
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({
        status:'success',
        data:updatedCourse,
        message:'Course updated successfully'
    });
});

//delete course 
export const deleteCourse = catchAsync(async(req,res,next)=>{
    await courseService.deleteCourse(req.params.id);
    res.status(200).json({
        status:'success',
        message:'Course deleted successfully'
    });
});