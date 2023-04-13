import { Router } from 'express'
import { authMid } from '../middlewares/auth.middleware.js'
import { createAuthor, deleteAuthor, getAuthors } from '../controllers/author.controllers.js'

const router = Router()

router.post('/author', authMid, createAuthor)

router.get('/author', authMid, getAuthors)

router.delete('/author/:id', authMid, deleteAuthor )

export default router
