import * as userService from '../services/auth.service.js';
import * as tokens from '../utils/generateTokens.util.js'
import catchAsync from '../utils/catchAsync.util.js';
import AppError from '../utils/appError.util.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import emailEvent from '../utils/email/emailEvent.util.js';

//register
export const register = catchAsync(async(req,res,next)=>{
    const {firstName,lastName,email,password,phone,role}=req.body;

    const {user,token} = await userService.createUser({firstName,lastName,email,password,phone,role});
    emailEvent.emit('userRegistered',user,token);
    return res.status(201).json({
        success:true,
        data:user,
        message:'user created successfully'
    })
});

//activate account
export const activateAccount = catchAsync(async(req,res,next)=>{
    const {activateToken} = req.params;
    await userService.activateAccount(activateToken);
    const user = await userService.getUserByEmail(activateToken);
    
    await user.save();
    return res.status(200).json({
        success:true,
        data:user,
        message:'Account activated successfully'
    })
});


//login
export const login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await userService.getUserByEmail(email);
    if(!user) return next(new AppError('user not found',404));

    //check paassword
    const isCorrectpassword = await user.comparePassword(password);
    if(!isCorrectpassword) return next(new AppError('invalid credintial',401));

    //check user status
    if(!user.isActive) {
        const token = generateActivatetoken({id:user.userId});
        emailEvent.emit('userRegistered',user,token);
        return next(new AppError('please activate your account',401));
    }
    //generate access token
    const accessToken = tokens.generateAccessToken({id:user.userId,email,role:user.role});

    //generate refresh token
    const refreshToken = tokens.generateRefreshToken({id:user.userId});

    //hashing refresh token to store it in DB
    const hashedRefreshToken = tokens.hashRefershToken(refreshToken);

    await userService.saveRefreshToken(user.userId,hashedRefreshToken);

    res.status(200).cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'none',
        maxAge:process.env.JWT_REFRESH_EXPIRES_IN
    }).cookie('accessToken',accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'none',
        maxAge:process.env.JWT_ACCESS_EXPIRES_IN
    }).json({
        success:true,
        message:'user logged in successfully',
    })
});


//generate access token
export const refreshToken = catchAsync(async(req,res,next)=>{
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return next(new AppError('Refresh token not found',401));

    // hash the token to search in DB
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

    // get token from DB with eager loading to get user data if needed
    const storedToken = await userService.getRefreshtoken(hashedRefreshToken);
    if(!storedToken) return next(new AppError('Invalid refresh token',403));

    // verify JWT
    let decoded;
    try{
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    }catch(err){
        return next(new AppError('Invalid or expired refresh token',403));
    }

    // generate new access token
    const accessToken = tokens.generateAccessToken({ id: decoded.id });

    res.status(200).cookie('accessToken',accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'none',
        maxAge:process.env.JWT_ACCESS_EXPIRES_IN
    }).json({
        success:true,
        message:'Token refreshed successfully'
    });
});


//forget password
export const forgetpassword = catchAsync(async(req,res,next)=>{
    const {email} = req.body;
    const {user,resetToken} = await userService.generatePasswordResetToken(email);
    //emmiter
    emailEvent.emit('forgetPassword',user,resetToken);
    //save hashed token
    return res.status(200).json({
        success:true,
        message:'Password reset email sent successfully'
    })
});

//reset password
export const resetPassword = catchAsync(async(req,res,next)=>{
    const {token} = req.params;
    const {password} = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await userService.findUserByToken(hashedToken);

    if(!password) return next(new AppError('Password is required',400));
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    user.passwordChangedAt = Date.now(); 
    await user.save();
    return res.status(200).json({
        success:true,
        message:'Password reset successfully'
    })
});