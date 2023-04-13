import { DataTypes } from "sequelize";
import db from "../database/connection.js";

export const Type = db.define('Type', {
    id_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false, freezeTableName: true})
