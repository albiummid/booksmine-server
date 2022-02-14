const { Role } = require('../models/role')
exports.addRole = async (req, res, next) => {
  const { title, roleCode } = req.body

  if (!title || !roleCode) {
    res.status(400).json({
      success: false,
      msg: 'data missing !',
      isMissing: {
        title: !title?.length,
        roleCode: !roleCode?.length,
      },
    })
  } else {
    const newRole = await new Role({
      title,
      roleCode,
    })
    await newRole.save(async (err, doc) => {
      const roles = await Role.find()
      if (err) {
        res.json({
          success: false,
          msg: `couldn't create new role `,
          err,
        })
      } else {
        res.json({
          success: true,
          msg: 'Successfully Role created!',
          role: doc,
          roles,
        })
      }
    })
  }
}

exports.getAllRole = async (req, res, next) => {
  const roles = await Role.find()
  if (!roles) {
    res.status(404).json({
      success: false,
      msg: 'Not found!',
    })
  } else {
    res.json({
      success: true,
      msg: `Got ${roles.length} roles`,
      roles,
    })
  }
}

exports.getRoleByCode = async (req, res, next) => {
  const { roleCode } = req.query
  if (!roleCode) {
    res.json({
      success: false,
      msg: 'roleCode is missing',
    })
  } else {
    const role = Role.findOne({ roleCode })
    if (role) {
      res.json({
        success: true,
        msg: 'Role is found!',
        roleIs: role.title,
      })
    } else {
      res.json({
        success: false,
        msg: 'Role is not found for this code!',
      })
    }
  }
}
