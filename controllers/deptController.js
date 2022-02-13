const Department = require('../models/department')

exports.addDepartment = async (req, res, next) => {
  const { name, departmentCode } = req.body

  if (!name || !departmentCode) {
    res.json({
      success: false,
      msg: 'name or departmentCode is missing',
    })
  } else {
    const department = await Department.create({ name, departmentCode })
    if (!department) {
      res.json({
        success: false,
        msg: 'Department is not created.',
      })
    } else {
      const departments = await Department.find()
      res.status(200).json({
        success: true,
        msg: 'Department successfully created.',
        department,
        departments,
      })
    }
  }
}

exports.findDepartment = async (req, res, next) => {
  const { id } = req.params
  const department = await Department.findById(id)
  if (!department) {
    res.status(404).json({
      success: false,
      msg: 'Something went wrong! No data found',
    })
  } else {
    res.status(200).json({
      success: true,
      msg: 'Got the data',
      department,
    })
  }
}

exports.getAllDepartment = async (req, res, next) => {
  const departments = await Department.find()
  if (!departments.length) {
    res.status(404).json({
      success: false,
      msg: 'Noting found in the database !',
    })
  } else {
    res.status(200).json({
      success: true,
      msg: `Got ${departments.length} departments`,
      departments,
    })
  }
}

exports.updateDepartment = async (req, res, next) => {
  const id = req.params.id
  const { name, departmentCode } = req.body
  const department = await Department.findById(id)
  if (!department) {
    res.json({
      success: false,
      msg: "Something went wrong! didn't find the data",
    })
  } else {
    department['name'] = name
    department['departmentCode'] = departmentCode

    await department.save(async (err, doc) => {
      const departments = await Department.find()
      if (err) {
        res.json({
          success: false,
          msg: 'something went wrong!',
        })
      } else {
        res.status(200).json({
          success: true,
          msg: 'Successfully updated department data.',
          department,
          departments,
        })
      }
    })
  }
}
exports.deleteDepartment = async (req, res, next) => {
  const id = req.params.id
  const department = await Department.findById(id)
  if (!department) {
    res.json({
      success: false,
      msg: "Something went wrong! Didn't find to delete",
    })
  } else {
    department.remove()
    const departments = await Department.find()
    res.status(200).json({
      success: true,
      msg: 'Successfully Deleted.',
      departments,
    })
  }
}
