import joi from 'joi';

const generalFields = {
    title:joi.string().min(3).max(50),
    description:joi.string().min(10).max(500),
    price:joi.number().min(0),
    thumbnail:joi.string(),
    instructorId:joi.string().required()
}

//get All courses
export const getAllCourses = joi.object({
    categoryId:joi.string().required()
});

//get Cousre
export const getCourse = joi.object({
    id:joi.string().required()
});

//create course
export const createCourse = joi.object({
    title:generalFields.title.required(),
    description:generalFields.description.required(),
    price:generalFields.price.required(),
    thumbnail:generalFields.thumbnail.required(),
    instructorId:generalFields.instructorId.required()
});

//update course
export const updateCourse = joi.object({
    id: joi.string().required(),
    ...generalFields
});

//delete course
export const deleteCourse = joi.object({
    id: joi.string().required()
});