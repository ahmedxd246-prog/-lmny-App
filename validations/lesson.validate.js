import joi from 'joi';

const generalFields = {
    title:joi.string().min(3).max(50),
    videoURL:joi.string().min(10).max(255),
    posterURL:joi.string().min(10).max(255)
}

//get All Lesson
export const getAllLessons = joi.object({
    courseId : joi.string().required()
});

//get lesson
export const getLesson = joi.object({
    id:joi.string().required()
});

//create lesson
export const createLesson = joi.object({
    title:generalFields.title.required(),
    videoURL:generalFields.videoURL.required(),
    posterURL:generalFields.posterURL.required()
});

//update lesson
export const updateLesson = joi.object({
    id:joi.string().required(),
    ...generalFields
});

//delete lesson
export const deleteLesson = joi.object({
    id:joi.string().required()
});