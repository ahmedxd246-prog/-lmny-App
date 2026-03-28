import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/data.config.js";

const Lesson = sequelize.define('Lesson',{
    lessonId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    videoURL:{
        type:DataTypes.STRING(255),
        allowNull:false,
        validate:{
            isUrl:true
        }
    },
    posterURL:{
        type:DataTypes.STRING(255),
        validate:{
            isUrl:true
        }
    }
},{paranoid:true},{timestamps:true,createdAt:'createdAt',updatedAt:'updatedAt'});

// Lesson.sync({force:true}).then(()=>{
//     console.log("Lesson model synced")
// }).catch(err=>console.log(err));


export default Lesson;