import User from './user.model.js';
import Enrollment from './enrollment.model.js';
import Lesson from './lesson.model.js';
import Course from './course.model.js';
import Category from './category.model.js';
import RefreshToken from './refreshTokens.model.js';



export const applyAssociations = () => {
// One To Many (Lesson → Course)
Lesson.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course',
    onDelete: 'CASCADE'
});

Course.hasMany(Lesson, {
    foreignKey: 'courseId',
    as: 'lessons'
});


// One To Many (Course → Category)
Course.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category',
    onDelete: 'CASCADE'
});

Category.hasMany(Course, {
    foreignKey: 'categoryId',
    as: 'courses'
});

// Many To Many (User ↔ Course)
User.belongsToMany(Course, {
    through: Enrollment,
    foreignKey: 'userId',
    as: 'courses',
    onDelete: 'CASCADE'
});

Course.belongsToMany(User, {
    through: Enrollment,
    foreignKey: 'courseId',
    as: 'students',
    onDelete: 'CASCADE'
});
};


Course.belongsTo(User, { as: 'Instructor', foreignKey: 'instructorId' }); 
User.hasMany(Course, { as: 'Courses', foreignKey: 'instructorId' });

// one to many (refreshToken to user)
RefreshToken.belongsTo(User,{
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE'
});

User.hasMany(RefreshToken, {
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE'
});

