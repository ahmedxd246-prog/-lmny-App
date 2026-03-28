import { DataTypes } from "sequelize";
import { sequelize } from "../config/data.config.js";
import User from "./user.model.js"; 

const Course = sequelize.define('Course', {
  courseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { isUrl: true }
  },
  instructorId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  }
}, {
  paranoid: true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});



export default Course;