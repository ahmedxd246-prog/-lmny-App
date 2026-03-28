import dotenv from 'dotenv';

import express from 'express';
import cors from './middleware/cors.middleware.js';
import globalErrorHandler from './middleware/errorHandler.middleware.js';
import cookieParser from 'cookie-parser';
import connectDB, { syncDB } from './config/data.config.js';
import authRoutes from './routes/auth.route.js';
import categoryRoutes from './routes/category.route.js';
import courseRoutes from './routes/course.route.js';
import lessonRoutes from './routes/lesson.route.js';
import userRoutes from './routes/user.route.js';

import { applyAssociations } from './models/models.associations.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors);
app.use(cookieParser());

connectDB();
syncDB();
applyAssociations();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/lesson', lessonRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/user', userRoutes);

app.use(globalErrorHandler);

app.listen(port, () => console.log(`Server running on port ${port}🚀`));
