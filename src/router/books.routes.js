import express from 'express'
import { create, destroy, getBook, getBooks, update } from '../controllers/book.controllers.js'
import {authMid} from '../middlewares/auth.middleware.js'

import multer from 'multer'
const multa = multer({dest: './uploads'})

const router = express.Router()

router.post('/book', authMid, multa.single('file'), create)
router.get('/book/:id', getBook)
router.put('/book/:id', authMid, multa.single('file'), update)
router.delete('/book/:id', authMid, destroy)
router.get('/book', getBooks)

export default router