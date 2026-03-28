import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/data.config.js";

const Enrollment = sequelize.define('Enrollment',{
    status: { type: DataTypes.ENUM('pending','completed'), defaultValue:'pending' },
},{timestamps:true,createdAt:'createdAt',updatedAt:'updatedAt'});


// Enrollment.sync({force:true}).then(()=>{
//     console.log("Enrollment model synced")
// }).catch(err=>console.log(err));

export default Enrollment;