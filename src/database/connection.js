import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

//creando la conexion a la Base de Datos utilizando .dotenv y sequelize.

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.db_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT
});

export default db;
