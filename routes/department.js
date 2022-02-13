const express = require('express')
const router = express.Router()

const deptController = require('../controllers/deptController')

router.post('/add', deptController.addDepartment)
router.get('/all', deptController.getAllDepartment)
router.get('/find/:id', deptController.findDepartment)
router.patch('/update/:id', deptController.updateDepartment)
router.delete('/delete/:id', deptController.deleteDepartment)

module.exports = router
