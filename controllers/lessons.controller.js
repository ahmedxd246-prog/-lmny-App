import * as lessonService from '../services/lessons.service.js';
import catchAsync from '../utils/catchAsync.util.js';

//get all lessons
export const getAllLessons = catchAsync(async(req,res,next)=>{
    const lessons = await lessonService.getAllLessons(req.params.courseId);
    res.status(200).json({
        status:'success',
        data:lessons
    });
});

//get lesson by Id
export const getLesson = catchAsync(async(req,res,next)=>{
    const lesson = await lessonService.getLesson(req.params.id);
    res.status(200).json({
        status:'success',
        data:lesson
    });
});

//create lesson 
export const createLesson = catchAsync(async(req,res,next)=>{
    const {title,videoURL,posterURL} = req.body;
    const newLesson = await lessonService.createLesson({title,videoURL,posterURL});
    res.status(201).json({
        status:'success',
        data:newLesson,
        message:'lesson created successfully'
    });
});

//update lesson
export const updateLesson = catchAsync(async(req,res,next)=>{
    const updatedLesson = await lessonService.updateLesson(req.params.id, req.body);
    res.status(200).json({
        status:'success',
        data:updatedLesson,
        message:'lesson updated successfully'
    });
});


//destroy lesson
export const deleteLesson = catchAsync(async(req,res,next)=>{
    await lessonService.deleteLesson(req.params.id);
    res.status(200).json({
        status:'success',
        message:'lesson deleted successfully'
    });
})
