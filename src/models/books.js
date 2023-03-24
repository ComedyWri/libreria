import { DataTypes } from "sequelize";
import db from "../database/connection.js";

import { bookFile } from "./bookFiles.js";

//creando modelo de la tabla books

export const Book = db.define('books',{

  id_book:{
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  book_name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  book_price:{
    type:DataTypes.STRING,
    allowNull:false
  },
  book_date:{
    type: DataTypes.STRING,
    allowNull: false
  }

}, {timestamps: false})