import express from 'express'
import * as mypageController from '../controller/mypage.js'

const router = express.Router()

router.delete('/delete', mypageController.Deleting)

router.get('/auth', mypageController.Auth)

router.post('/change', mypageController.Change)

export default router
