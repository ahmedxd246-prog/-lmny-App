import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/data.config.js";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    fullName:{type:DataTypes.VIRTUAL,
        get(){
            return `${this.firstName} ${this.lastName}`;
        }
    },
    phone: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    email: { 
        type: DataTypes.STRING, allowNull: false, unique: true, 
        validate: { isEmail: true } 
    },
    password: { 
        type: DataTypes.STRING, allowNull: false, 
        validate: {
            len: [6, 50],
            notEmpty: true,
            notIn: [['password','123456','qwerty']]
        } 
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue:false },
    role: { type: DataTypes.ENUM('student','instructor'), defaultValue:'student' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue:true },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue:false },

},{paranoid:true,indexes: [
  {
    unique: true,
    fields: ['email','userId']
  }
]},{timestamps:true,createdAt:'createdAt',updatedAt:'updatedAt'});

// Sync with DB
// User.sync({ force: true }).then(() => {
//     console.log("User model synced");
// }).catch(err => console.log(err));

// Hash password before create
User.beforeSave(async (user) => {
    if(user.changed('password')){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Add prototype method for comparing passwords
User.prototype.comparePassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
};

export default User;