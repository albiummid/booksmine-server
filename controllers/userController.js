const { User } = require('../models/user')
exports.addUser = async (req, res, next) => {
  const { _id, accessToken, userName, email, photoURL, userSettings } = req.body
  if (!accessToken || !userName || !email || !photoURL || !userSettings) {
    res.status(400).json({
      success: false,
      message: 'Some fields are missing',
      isDataAvailable: {
        accessToken: accessToken?.length > 0,
        userName: userName?.length > 0,
        email: email?.length > 0,
        photoURL: photoURL?.length > 0,
        userSettings: userSettings != null || userSettings != undefined,
      },
    })
  } else {
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

  if (!(query.email || query._id)) {
    res.json({
      msg: 'some data missing',
      success: false,
    })
  } else {
    const user = await User.findOne({ ...query })
    if (!user) {
      res.json({
        success: false,
        msg: 'Error',
      })
    } else {
      res.json({
        success: true,
        msg: 'user found!',
        user,
      })
    }
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
