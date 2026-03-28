import AppError from '../utils/appError.util.js';

//validate middleware
const validate = (schema,arg=(req)=>req.body)=>{
    return (req,res,next)=>{
        const data = arg(req);
        const {error}= schema.validate(data,{abortEarly:false});
        if(error){
            return next(new AppError(error.details.map(err=>err.message).join(', '),400))
        }
        next()
    }
}
export default validate;