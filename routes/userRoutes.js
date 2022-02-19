const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/add', userController.addUser)
router.get('/getUserBy', userController.getUserBy)
router.get('/getUserRoleBy', userController.getUserRoleBy)
router.get('/all', userController.getAllUser)
router.patch('/update', userController.updateUser)
router.patch('/updateUserSettings', userController.updateUserSettings)

module.exports = router
