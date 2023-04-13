import express from 'express'
import { create, destroy, getBook, getBooks, update } from '../controllers/book.controllers.js'
import {authMid} from '../middlewares/auth.middleware.js'
import { Type } from '../models/type.js'
import multer from 'multer'


const multa = multer({dest: './uploads'})

const router = express.Router()

router.post('/book', authMid, multa.single('file'), create)
router.get('/book/:id', authMid, getBook)
router.put('/book/:id', authMid, multa.single('file'), update)
router.delete('/book/:id', authMid, destroy)
router.get('/book', authMid, getBooks)
router.get('/btype', authMid, async (req, res) => {
try {
        const bookType = await Type.findAll()
        res.status(200).send(bookType)
} catch (error) {
    console.error(error)
}
})

export default router
