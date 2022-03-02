const Transaction = require('../models/transaction')

exports.add = async (req, res, next) => {
  const exist = await Transaction.find({ trxId: req.body.trxId })
  if (exist.length) {
    return res.status(400).json({
      msg: 'Already exists',
    })
  }
  try {
    const transaction = await Transaction.create({ ...req.body })
    res.json({
      success: true,
      msg: 'Created !',
      transaction,
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
  const transactionList = await Transaction.find()
  if (!transactionList.length) {
    return res.status(404).json({
      msg: 'No transaction book found!',
    })
  }
  res.json({
    success: true,
    transactions: transactionList,
  })
}

exports.update = async (req, res, next) => {
  try {
    let transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    )
    const transactions = await Transaction.find()
    res.json({
      success: true,
      transaction,
      transactions,
    })
  } catch (err) {
    res.json({
      msg: 'error',
      error: err,
    })
  }
}

exports.delete = async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id)
  if (!transaction) {
    return res.status(404).json({
      msg: 'not found to delete',
    })
  }

  try {
    await transaction.remove()
    const transactions = await Transaction.find({ isValid: true })
    res.json({
      success: true,
      msg: 'removed',
      transactions,
    })
  } catch (err) {
    res.json({
      error: err,
      msg: 'Got and error',
    })
  }
}
