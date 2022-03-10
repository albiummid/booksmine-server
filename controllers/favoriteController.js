const User = require('../models/user')

exports.add = async (req, res, next) => {
  const { email, bookId } = req.body
  try {
    await User.updateOne(
      { email: email },
      {
        $push: {
          favorites: bookId,
        },
      }
    )
    const user = await User.find({ email })
    console.log(user)
    res.json({
      success: true,
      msg: 'Added to favorite',
      favorites: user.favorites,
    })
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      msg: 'Got an error',
      error: err,
    })
  }
}

exports.getAll = async (req, res, next) => {
  const favList = await User.find({ email: req.params.email })
    .populate('favorites')
    .exec()
  console.log(favList)
  if (!favList.length) {
    return res.status(404).json({
      msg: 'No favorite book found!',
    })
  }
  res.json({
    success: true,
    favoriteList: favList,
  })
}

exports.delete = async (req, res, next) => {
  const { email, bookId } = req.body
  console.log(email, bookId)
  try {
    const user = await User.findOne({ email })
    const newList = await user.favorites.filter(
      (item) => item.toString() !== bookId
    )
    user.favorites = newList
    await user.save()
    res.json({
      success: true,
      msg: 'removed',
    })
  } catch (err) {
    res.json({
      error: err,
      msg: 'Got and error',
    })
  }
}
