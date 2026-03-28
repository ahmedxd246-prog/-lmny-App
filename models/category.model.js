import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/data.config.js";

const Category = sequelize.define('Category',{
    categoryId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value){
            this.setDataValue('name',value.toLowerCase().trim())
        },
        validate:{
            notEmpty:{
                msg: "Category name cannot be empty"
            },
        }
    },
    
},{paranoid:true,
    indexes: [
  {
    unique: true,
    fields: ['name', 'deletedAt']
  }
],timestamps:true});


// Category.sync({force:true}).then(()=>console.log("Category table synced")).catch((err)=>console.log(err));

export default Category;