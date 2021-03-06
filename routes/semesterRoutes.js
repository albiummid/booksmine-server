const express = require('express')
const router = express.Router()

const semesterController = require('../controllers/semesterController')

router.post('/add/:deptId', semesterController.addSemester)
router.put('/update', semesterController.updateSemester)
router.delete('/delete', semesterController.deleteSemester)

module.exports = router
