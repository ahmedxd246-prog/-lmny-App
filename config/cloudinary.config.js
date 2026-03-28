import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        let folderName = 'عLMNY';

        if (req.baseUrl.includes('users')) {
            folderName += '/users';
        } 
        else if (req.baseUrl.includes('courses')) {
            const courseId = req.body.courseId || 'general';
            folderName += `/courses/course_${courseId}`;
        } 
        else if (req.baseUrl.includes('lessons')) {
            const courseId = req.body.courseId || 'general';
            folderName += `/courses/course_${courseId}/lessons`;
        }

        return {
            folder: folderName,
            allowed_formats: ['jpg', 'jpeg', 'png', 'mp4','mov']
        };
    }
});

const upload = multer({ storage });

export default upload;