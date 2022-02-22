const { User } = require('../models/user')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.addUser = async (req, res, next) => {
  const userDoc = await new User({ ...req.body })
  await userDoc.save(async (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Got an error creating user!',
        err,
      })
    } else {
      res.json({
        msg: 'userCreatedSuccessfully',
        user,
      })
    }
  })
}

exports.getAllUser = async (req, res, next) => {
  const users = await User.find()
  if (!users) {
    res.status(404).json({
      success: false,
      msg: 'Not found!',
    })
  } else {
    res.json({
      success: true,
      msg: `Got ${users.length} users`,
      users,
    })
  }
}

exports.getUserBy = async (req, res, next) => {
  const query = req.query
  const user = await User.findOne({ ...query })
  if (!user) {
    res.status(404).json({
      success: false,
      msg: 'user not found!',
    })
  } else {
    res.json({
      success: true,
      msg: 'user found!',
      user,
    })
  }
}
exports.getUserRoleBy = async (req, res, next) => {
  console.log('called')
  const query = req.query
  const user = await User.findOne({ ...query })
  if (user) {
    res.json({
      success: true,
      msg: 'user found!',
      role: user?.role,
    })
  } else {
    res.status(404).json({
      success: false,
      msg: 'user not found!',
    })
  }
}

exports.updateUser = async (req, res, next) => {
  const newData = req.body
  const { _id } = req.query
  try {
    let userDoc = await User.findById(_id)
    Object.assign(userDoc, newData)
    await userDoc.save()
    const users = await User.find()
    res.json({
      success: true,
      msg: 'Successfully Updated !',
      users,
    })
  } catch (err) {
    res.json({ success: false, msg: 'Something Went wrong', err })
  }
}

exports.updateUserSettings = async (req, res, next) => {
  const newData = req.body
  const query = req.query
  const userDoc = await User.findOne({ ...query })
  const prevData = await userDoc.userSettings
  userDoc.userSettings = {
    ...prevData,
    ...newData,
  }
  userDoc.save(async (err, user) => {
    if (!err) {
      res.json({
        success: true,
        user,
        msg: 'UserSettings updated',
        userSettings: user.userSettings,
      })
    } else {
      res.json({
        success: false,
        msg: err.message,
      })
    }
  })
}
