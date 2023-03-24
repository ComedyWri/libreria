import { Router } from 'express'
import { author } from '../models/author.js'
import { authMid } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/author', authMid, async (req, res) => {
    const {name} = req.body
    try {
        const newAuthor = await author.create({
            author_name: name
        })
        res.status(201).json('The Author was succesfully created')
    } catch (error) {
        console.error(error)
    }   
})

router.get('/author', authMid, async (req, res) => {
    try {
        const getAuthors = await author.findAll()   
        res.send(getAuthors)
    } catch (error) {
        console.error(error)
    }
})

export default router