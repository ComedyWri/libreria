import { DataTypes } from "sequelize";
import db from "../database/connection.js";

export const Type = db.define('Type', {
    id_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false, freezeTableName: true})

export const addData = async() => {
    try {
        await Type.bulkCreate([{
            id_type: 1,
            type: 'Romance',
        }, {
            id_type: 2,
            type: 'Action'
        }, {
            id_type: 3,
            type: 'Fantasy'
        }, {
            id_type: 4,
            type: 'Programming'
        }],{
            ignoreDuplicates: false
        })
    } catch (error) {
        console.error('Data already exists')
    }
}
