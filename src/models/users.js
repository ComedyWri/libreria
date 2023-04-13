import { DataTypes } from "sequelize";
import db from "../database/connection.js";

export const users = db.define('users',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false})
