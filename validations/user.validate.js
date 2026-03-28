import joi from 'joi';

const generalField = {
  firstName: joi.string().min(3).max(20),
  lastName: joi.string().min(3).max(20),
  phone: joi.string()
            .pattern(/^\d{11,15}$/)
            
            .messages({
              'string.pattern.base': 'Phone must be 11 to 15 digits'
            }),
  email: joi.string()
            .email()
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            ,
  password: joi.string()
               .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
               
               .messages({
                  'string.pattern.base': 'Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character and 8+ characters'
               }),
  role: joi.string().valid('student', 'instructor')
};

//register
export const validateRegister = joi.object({
  firstName: generalField.firstName.required(),
  lastName: generalField.lastName.required(),
  phone: generalField.phone.required(),
  email: generalField.email.required(),
  password: generalField.password.required(),
  role: generalField.role.required()
});

//activate account
export const validateActivateAccount = joi.object({
    token:joi.string().required()
});

//login
export const validateLogin = joi.object({
    email:generalField.email.required(),
    password:generalField.password.required()
});

//forget password
export const validateForgetPassword = joi.object({
    email:generalField.email.required()
});

//reset password
export const validateResetPassword = joi.object({
    token:joi.string().required(),
    password:generalField.password.required()
});

//generate access token
export const validatetGenerateAT = joi.object({
    refreshtoken : joi.string().required()
});

//get all users
export const validateGetAllUsers = joi.object({
    courseId: joi.string().required()
});

//get user
export const validateGetUser = joi.object({
    id: joi.string().required()
});

//update User
export const validateUpdateUser = joi.object({
    id: joi.string().required(),
    ...generalField
});

//delete user
export const validateDeleteUser = joi.object({
    id: joi.string().required()
});


