import { Router } from 'express'
import { author } from '../models/author.js'
import { authMid } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/author', authMid, async (req, res) => {
    const {name} = req.body
    try {
        await author.create({
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

router.delete('/author/:id', authMid, async (req, res) => {
    const {id} = req.params
    try {
        await author.destroy({where: {
            author_id: id
        }})
        res.status(200).send('Author was succesfully deleted')
    } catch (error) {
        console.error(error)
    }
})

export default router