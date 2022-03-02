const Category = require('../models/category')

// we don't need to send whole data in add because we can just push the single object. but on delete and update we can't push them we have to update whole array. //

exports.add = async (req, res, next) => {
  try {
    const category = await Category.create({ title: req.body.title })
    res.json({
      success: true,
      msg: 'Created !',
      category,
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
  const categories = await Category.find()
  if (!categories) {
    return res.json({
      success: false,
      msg: 'No categories in the database',
    })
  }
  res.json({
    success: true,
    categories,
  })
}

exports.delete = async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    return res.status(404).json({
      msg: 'not found to delete',
    })
  }

  try {
    await category.remove()
    const categories = await Category.find()
    res.json({
      success: true,
      msg: 'removed',
      categories,
    })
  } catch (err) {
    res.json({
      error: err,
      msg: 'Got and error',
    })
  }
}
