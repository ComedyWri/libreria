import express from 'express'
import { authMid } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/welcome', authMid)


export default router