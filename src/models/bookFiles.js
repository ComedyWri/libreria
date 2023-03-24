import db from "../database/connection.js";
import {DataTypes } from "sequelize";
import { Book } from "./books.js";

export const bookFile = db.define('book_files', {
    id_file:{
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    book_img:{
        type: DataTypes.STRING,
        allowNull: false
    },
    book_file:{
        type: DataTypes.STRING,
    },
    cloudinary_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false, freezeTableName: true})
