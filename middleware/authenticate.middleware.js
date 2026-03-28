import catchAsync from '../utils/catchAsync.util.js'
import jwt from 'jsonwebtoken';
const authenticate = catchAsync((req, res, next) => {
    let token ;
    if(req.cookies && req.cookies.accessToken){
        token = req.cookies.accessToken;
    }else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return next(new AppError('Please log in to get access', 401));

    const decoded = jwt.verify(token,process.env.JWT_Access_Secret);
    req.user=decoded;
    next();
});

export default authenticate;