import Course from '../models/course.model.js';
import Category from '../models/category.model.js';
import AppError from '../utils/appError.util.js';


//get all courses related to category
export const getAllCourses =async(categoryId) => {
    const courses = await Course.findAll({ where: { categoryId },
        attributes:{exclude:['id']},
    includes:[
        {
            mode: Category,
            as: 'category',
            attributes:['name']
        }
    ]
    });
    if(courses.length === 0){
        throw new AppError('No courses found for this category', 404);
    }
    return courses;
};

//get all courses related to instructor 
export const getAllCoursesRelatedToInstructor = async(instructorId)=>{
    const courses = await Course.findAll({where:{instructorId},include:[{
        model:Category,
        as:'category',
        attributes:['name']
    }],include:[{
        model:User,
        as:'instructor',
        attributes:['firstName','lastName']
    }],attributes:{exclude:['id']}});
    if(courses.length === 0){
        throw new AppError('No courses found for this instructor', 404);
    }
    return courses;
}

//get course by id
export const getCourseById =async(courseId) => {
    const course = await Course.findByPk(courseId,
        {
            attributes : {exclude:['id']},
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                    include:[
                        {
                            model:Lesson,
                            as : 'lessons',
                            attributes: ['title']
                        }
                    ]
                }
            ]
        }
    );
    if(!course){
        throw new AppError('Course not found', 404);
    }
    return course;
};


//create course
export const createCourse =async(data) => {
    const newCourse = await Course.create(data);
    return newCourse;
};


//update course
export const updateCourse =async(courseId, data) => {
    await getCourseById(courseId); 
    await Course.update(data, { where: { id: courseId } });
    const updatedCourse = await getCourseById(courseId);
    return updatedCourse;
};

//delete course
export const deleteCourse =async(courseId) => {
    await getCourseById(courseId); 
    await Course.destroy({ where: { id: courseId } });
};