import AppError from '../utils/appError.util.js';
 const authorize = (allowedRoles) => (req, res, next) => {
  if (allowedRoles.includes(req.user.role)) {
    return next();
  } else {
    return next(
      new AppError('You are not authorized to access this route', 403),
    );
  }
};

export default authorize;