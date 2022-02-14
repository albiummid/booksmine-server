const express = require('express')
const router = express.Router()

const roleController = require('../controllers/roleController')

router.post('/add', roleController.addRole)

// role/getBy?roleCode=code
router.get('/getBy', roleController.getRoleByCode)
router.get('/all', roleController.getAllRole)

module.exports = router
