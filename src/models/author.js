import { DataTypes } from "sequelize";
import db from "../database/connection.js";
import {Book} from './books.js'

export const author = db.define('author', {
    author_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    author_name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false})

