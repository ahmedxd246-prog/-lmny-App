import Lesson from '../models/lesson.model.js';
import Course from '../models/course.model.js';
import Category from '../models/course.model.js';
import AppError from '../utils/appError.util.js';

//get lessons related to course
export const getAllLessons = async (courseId)=>{
    const lessons = await Lesson.findAll({where:{courseId},
    include:[
        {
            model: Course,
            as: 'course',
            attributes: ['title'],
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        }
    ]
}) 
    return lessons;
};

//get lesson by Id
export const getLesson = async(id)=>{
    const lesson = await Lesson.findByPk(id);
    if(!lesson) throw new AppError('lesson not found',404);
    return lesson;
}

//create lesson
export const createLesson = async(data)=>{
   const newLesson = await Lesson.create(data);
   return newLesson;
}

//update lesson
export const updateLesson = async(id,data)=>{
    const lesson = await getLesson(id);
    return lesson.update(data);
}

//delete lesson
export const deleteLesson = async(id)=>{
    const lesson = await getLesson(id);
    await lesson.destroy();
    return true;
}