const express = require('express')
const router = express.Router()

const favoriteController = require('../controllers/favoriteController')

router.post('/', favoriteController.add)
router.get('/:email', favoriteController.getAll)
router.delete('/', favoriteController.delete)

module.exports = router
