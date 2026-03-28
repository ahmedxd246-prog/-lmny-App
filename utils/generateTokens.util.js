import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_EXPIRES_IN});
}

export const generateRefreshToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN});
}

export const hashRefershToken = (token)=>{
    return crypto.createHash('sha256').update(token).digest('hex');
}

export const generateActivatetoken = ()=>{
    return crypto.randomBytes(32).toString('hex');
}

export const generateForgetPasswordToken = ()=>{
    return crypto.randomBytes(32).toString('hex');
}