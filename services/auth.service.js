import User from '../models/user.model.js';
import AppError from '../utils/appError.util.js';

export const createUser =async(data)=>{
    if(getUserByEmail(data.email)) throw new AppError('User already exists',400);
   const user = await User.create(data);
    const token = generateActivatetoken({id:user.userId});
    user.activationToken = crypto.createHash('sha256').update(token).digest('hex');
    await user.save();
    return {user,token};
}; 

export const activateAccount = async(token)=>{  
    const hashedtoken = crypto.createHash('sha256').update('token').digest('hex');
    const user = await User.findOne({where:{activationToken:hashedtoken,
        activationExpires:{
            [Op.gt]:Date.now()
        }
    }});
    if(!user) throw new AppError('Invalid token',400);
    user.isActive = true;
    user.activationToken = null;
    user.activationExpires = null;
    await user.save();
    return user;
}
export const getUserById = async(id)=>{
    const user = await User.findByPk(id);
    if(!user) throw new AppError('User not found',404);
    return user;
    
};

export const getUserByEmail = async(email)=>{
    const user = await User.findOne({where:{email}});
    if(!user) throw new AppError('User not found',404);
    return user;
};

export const getAllUsers =async(courseId)=>{
    return User.findAll({where:{courseId},
        include:[{model:'Course',attributes:['id','title']
        }],
        attributes: ['firstName', 'lastName', 'email']
});
    
};

export const updateUser = async(id,data)=>{
    const user = await getUserById(id);
    if(!user) throw new AppError('user not found',404);
   return user.update(data);
};

export const softDeleteUser = async(id)=>{
    const user = await getUserById(id);
    if(!user) throw new AppError('user not found',404);
    await User.destroy({where:{id}});
    return true;

};

export const saveRefreshToken = async(id,token)=>{
    const user = await getUserById(id);
    user.refreshToken = token;
    await user.save();
};

export const getRefreshtoken = async(token)=>{
    return await User.findOne({where:{refreshToken:token}});
};

export const generatePasswordResetToken = async(email)=>{
    const user = await getUserByEmail(email);
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    return {user,resetToken}
}

export const findUserByToken = async(token)=>{
   const user =  await User.findOne({where:{passwordResetToken:token,
        passwordResetExpires: {
            [Op.gt]: Date.now(),
          },
    }});
    if(!user) throw new AppError('Invalid token',400);
    return user;
};