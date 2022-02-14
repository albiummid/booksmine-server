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
