const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/add', userController.addUser)
router.get('/getUserBy', userController.getUserBy)
router.get('/all', userController.getAllUser)
router.post('/updateUserSettings', userController.updateUserSettings)

module.exports = router
