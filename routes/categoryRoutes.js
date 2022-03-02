const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

router.get('/all', categoryController.getAll)
router.post('/', categoryController.add)
router.delete('/:id', categoryController.delete)

module.exports = router
