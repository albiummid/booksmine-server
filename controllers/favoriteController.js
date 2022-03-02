const Favorite = require('../models/favorite')

exports.add = async (req, res, next) => {
  const { email, bookId } = req.body
  try {
    const favorite = await Favorite.create({ email, bookId: { _id: bookId } })
    res.json({
      success: true,
      msg: 'Created !',
      favorite,
    })
  } catch (err) {
    res.json({
      success: false,
      msg: 'Got an error',
      error: err,
    })
  }
}

exports.getAll = async (req, res, next) => {
  const favList = await Favorite.find({ email: req.params.email }).populate(
    '_id'
  )
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
  const favorite = await Favorite.findById(req.params.id)
  if (!favorite) {
    return res.status(404).json({
      msg: 'not found to delete',
    })
  }

  try {
    favorite.remove()
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
