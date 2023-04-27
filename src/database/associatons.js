import { author } from "../models/author.js";
import { Book } from "../models/books.js";
import { bookFile } from "../models/bookFiles.js";
import { desc } from "../models/desc.js";


//relacion de desc (Categorias) y Book (Libros):
desc.hasMany(Book,{
    foreignKey: 'description',
    sourceKey: 'id_desc'
})

Book.belongsTo(desc, {
    foreignKey: 'description',
    targetKey: 'id_desc'
})

//relacion de Book (Libros) y Book File:

Book.hasOne(bookFile)

bookFile.belongsTo(Book)

//relacion de Authors y Book:

author.hasMany(Book,{
    foreignKey: 'author_book',
    sourceKey: 'author_id',
    onDelete: 'CASCADE'
})

Book.belongsTo(author, {
    foreignKey: 'author_book',
    targetKey: 'author_id'
})
