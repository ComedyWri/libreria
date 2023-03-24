import { DataTypes } from "sequelize";
import db from "../database/connection.js";
import { Book } from "./books.js";

export const desc = db.define('book_desc', {
    id_desc:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    book_desc:{
        type:DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false, freezeTableName: true})

desc.hasMany(Book,{
    foreignKey: 'description',
    sourceKey: 'id_desc'
})

Book.belongsTo(desc, {
    foreignKey: 'description',
    targetKey: 'id_desc'
})