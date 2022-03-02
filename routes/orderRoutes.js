const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')

router.post('/add', orderController.add)
router.get('/all', orderController.all)
router.get('/status/:status', orderController.filterStatus)
router.get('/buyingList', orderController.buyingList)
router.get('/getOrdersBy', orderController.userOrder)
router.delete('/:id', orderController.delete)
router.put('/:id', orderController.update)
router.patch('/updateOrders/', orderController.updateMany)

module.exports = router
