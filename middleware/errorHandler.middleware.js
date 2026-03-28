
import logger from '../config/logger.config.js';

const errorMap = {
  SequelizeUniqueConstraintError: { statusCode: 400 },
  SequelizeValidationError: { statusCode: 400 },
  JsonWebTokenError: { statusCode: 401, message: 'Invalid token' },
  TokenExpiredError: { statusCode: 401, message: 'Token expired' },
  default: { statusCode: 500, message: 'Something went wrong' }
};

const globalErrorHandler = (err, req, res, next) => {

    if(err.isOperational){
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message
        });
    }
    const error = errorMap[err.name] || errorMap.default;
    const statusCode = error.statusCode;
    const status = statusCode < 500 ? 'fail' : 'error';

    const response = {
        status,
        message: error.message
    };

    // Handle Sequelize errors with map
    if(err.name === "SequelizeValidationError"){
        const messages = err.errors.map(e => `${e.path}: ${e.message}`);
        response.message = messages.join('; ');
    }

    if(err.name === "SequelizeUniqueConstraintError"){
        const fields = err.errors.map(e => e.path);
        response.message = `${fields.join(', ')} already exists`;
    }

    if(process.env.NODE_ENV === 'development'){
        response.stack = err.stack;
        response.error = err;
    }
    logger.error(`Error: ${err.message}`);
    res.status(statusCode).json(response);
};

export default globalErrorHandler;