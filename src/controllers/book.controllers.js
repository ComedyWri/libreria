import fs from 'fs-extra'

//importando modelos de tablas:
import { Book } from "../models/books.js"
import { bookFile } from "../models/bookFiles.js"
import { desc } from "../models/desc.js";


//importando controladores de Cloudinary:
import { uploadImage, deleteImage } from "../libs/Cloudinary.js"

//importando variables de entorno
import dotenv from 'dotenv'
import { author } from "../models/author.js";
dotenv.config()


//creando controladores
const create = async (req, res) => {
    let image;
    if (req.file){
       const result = await uploadImage(req.file.path)
       await fs.remove(req.file.path)
       image = {
        bookImg: result.secure_url,
        ImgPublicId: result.public_id,
       }
    }

    const { book, price, date, descrip, author, type } = req.body
    const { bookImg, ImgPublicId } = image ? image : ''
    try{
        const addDesc = await desc.create({
            type,
            book_desc: descrip
        })
        const newBook = await Book.create({
            book_name: book,
            book_price: price,
            book_date: date,
            description: addDesc.dataValues.id_desc,
            author_book: author
        })
        const bookiFile = await bookFile.create({
            book_img: bookImg ? bookImg : "https://avatarfiles.alphacoders.com/339/339989.png",
            cloudinary_id: ImgPublicId ? ImgPublicId : null,
            bookIdBook: newBook.dataValues.id_book
        })
        res.status(201).json('The book has been created')
    }catch(error){
        res.sendStatus(500)
        console.log(error)
    }
}

const getBooks = async (req, res) => {
    try {
        const getBooks = await Book.findAll({
            offset: 0,
            include: [bookFile, desc, author]
        })
        res.status(200).send(getBooks)
    } catch (error) {
        res.sendStatus(500)
    }
}

const getBook = async (req, res) => {
    try {
        const getBook = await Book.findAll({
            where:{
                id_book: req.params.id
            },
            include: [bookFile, desc, author]
        })
        res.status(200).json(getBook)
    } catch (error) {
        res.sendStatus(500)
    }
}

const update = async(req, res) => {
    let image;
    if (req.file){
       const result = await uploadImage(req.file.path)
       await fs.remove(req.file.path)
       image = {
        bookImg: result.secure_url,
        ImgPublicId: result.public_id,
       }
    }

    const { book, price, date, descrip, author, type } = req.body
    const { bookImg, ImgPublicId } = image ? image : ''
    try {

        const OneBook = await Book.findOne({
            where: {
                id_book: req.params.id
            },
            include: [bookFile]
        })
        const updatingBook = await Book.update({
            book_name: book,
            book_price: price,
            book_date: date,
            author_book: author
        },
        {
            where: {
                id_book: req.params.id
            }
        })
        const updatingDesc = await desc.update({
            type,
            book_desc: descrip
        },
        {
            where: {
                id_desc: OneBook.dataValues.description
            }
        })
        if (OneBook.dataValues.book_file.cloudinary_id != null){
            await bookFile.update({
                book_img: bookImg ? bookImg : OneBook.dataValues.book_file.book_img,
                cloudinary_id: ImgPublicId ? ImgPublicId : OneBook.dataValues.book_file.cloudinary_id
            },
            {
                where: {
                    bookIdBook: req.params.id
                }
            })
        }
        else {
            await bookFile.update({
                book_img: bookImg ? bookImg : "https://avatarfiles.alphacoders.com/339/339989.png",
                cloudinary_id: ImgPublicId ? ImgPublicId : null
            },
            {
                where: {
                    bookIdBook: req.params.id
                }
            })
        } 
        res.status(201).json('The book is updated')
    } catch (error) {
        console.error(error)
    }
}

const destroy = async(req, res) => {
        try {
            const getBook = await Book.findAll({
                where:{
                    id_book: req.params.id
                },
                include: [bookFile, desc, author]
            })
            try{
                const {cloudinary_id} = getBook[0].dataValues.book_file
                if(cloudinary_id){
                    deleteImage(cloudinary_id)
                }
                Book.destroy({
                    where: {
                        id_book: req.params.id
                    }
                })
            } catch (error) {
                console.error(error)
            }
            res.sendStatus(202)
        } catch (e) {
            console.error(e)
        }
}

    
export{
    create,
    getBook,
    getBooks,
    update,
    destroy
}
