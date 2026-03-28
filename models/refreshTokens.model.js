import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/data.config.js";

const RefreshToken = sequelize.define('RefreshToken',{
    tokenId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    token:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{timestamps:true,createdAt:'createdAt',updatedAt:'updatedAt'});

// RefreshToken.sync({alter:true}).then(()=>{
//     console.log("RefreshToken model synced")
// }).catch((err)=>{
//     console.log("Error syncing RefreshToken model",err)
// })

export default RefreshToken;