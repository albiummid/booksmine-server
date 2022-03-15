const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')

router.post('/', transactionController.add)
router.get('/all', transactionController.getAll)
router.put('/:id', transactionController.update)
router.delete('/:id', transactionController.delete)

module.exports = router
