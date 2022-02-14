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
  const { email, _id } = req.query

  if (!(email || _id)) {
    res.json({
      msg: 'some data missing',
      success: false,
    })
  } else {
    console.log(email, _id)
    if (email?.length) {
      console.log('got Email')
      const user = await User.findOne({ email: email })
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
    } else {
      console.log('_id Found')
      const user = await User.findById(_id)
      console.log(user)
      if (user) {
        res.json({
          success: true,
          msg: 'User Found !',
          user,
        })
      } else {
        res.json({
          success: false,
          msg: 'user not found!',
        })
      }
    }
  }
}

exports.updateUserSettings = async (req, res, next) => {
  const newData = req.body
  const query = req.query
  const userDoc = await User.findOne({ query })
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
