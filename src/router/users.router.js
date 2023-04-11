import express from 'express'
import { loginUser, registerUser } from '../controllers/users.controllers.js'
const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout', (req, res) => {
    res.clearCookie('session_token')
    res.sendStatus(205)
})

export default router
