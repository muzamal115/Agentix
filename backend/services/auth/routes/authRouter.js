import express from 'express'
import { deductCredit, login, logout, updateUserPayment } from '../controllers/authController.js'

const authRouter=express.Router()

authRouter.post('/login',login)
authRouter.get('/logout',logout)
authRouter.post('/update-plan',updateUserPayment  )
authRouter.post('/deduct-credits',deductCredit  )

export default authRouter
