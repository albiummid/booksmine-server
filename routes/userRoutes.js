const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/add', userController.addUser)
router.get('/getUserBy', userController.getUserBy)
router.get('/getUserRoleBy', userController.getUserRoleBy)
router.get('/all', userController.getAllUser)
router.put('/update', userController.updateUser)
router.put('/updateUserSettings', userController.updateUserSettings)
router.post('/checkAndCreateUser', userController.checkAndCreateUser)

module.exports = router
