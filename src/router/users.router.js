import express from 'express'
import { loginUser, registerUser } from '../controllers/users.controllers.js'
const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout', (req, res) => {
    res.clearCookie('session_token', {
    {domain: 'libreria-production.up.railway.app', path: '/', sameSite: 'none', secure: true}
    })
    res.sendStatus(205)
})

export default router
