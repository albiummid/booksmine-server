const Order = require('../models/order')
const Book = require('../models/book')
exports.add = async (req, res, next) => {
  const data = req.body

  const newOrder = new Order({ ...data })
  try {
    newOrder.save()
    res.json({
      success: true,
      order: newOrder,
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: 'failed to create an order.',
    })
  }
}

exports.all = async (req, res, next) => {
  const orders = await Order.find()

  if (!orders.length) {
    res.json({
      success: false,
      msg: 'No data found !',
    })
  } else {
    res.json({
      success: true,
      msg: `Got ${orders.length} order items`,
      orders,
    })
  }
}

exports.filterStatus = async (req, res, next) => {
  const { status } = req.params
  const orders = await Order.find({ status: status })

  if (!orders.length) {
    res.json({
      success: false,
      msg: 'No data found !',
    })
  } else {
    res.json({
      success: true,
      msg: `Got ${orders.length} ${status} order items`,
      orders,
    })
  }
}

exports.buyingList = async (req, res, next) => {
  const pendingList = await Order.find({ status: 'pending' })
  if (!pendingList.length) {
    res.status(404).json({
      success: false,
      msg: 'Pending Order empty !',
    })
    return
  }
  const buyingOrders = []
  let buyingBooks = []
  let totalCost = 0

  // Generating BookList for buy...
  pendingList.forEach((order) => {
    buyingOrders.push(order._id)
    order.books.forEach((book) => {
      const idxExistBook = buyingBooks.findIndex(
        (item) => item._id === book._id
      )
      if (idxExistBook >= 0) {
        buyingBooks[idxExistBook].quantity += book.quantity
        return
      }
      buyingBooks.push(book)
    })
  })

  //calculating total cost
  buyingBooks.forEach((item) => (totalCost += item.price * item.quantity))

  res.json({
    success: true,
    count: buyingBooks.length,
    buyingList: buyingBooks,
    buyingOrders,
    totalCost,
  })
}

exports.userOrder = async (req, res, next) => {
  const { email, _id } = req.query
  const userOrders = email?.length
    ? await Order.find({ email: email.trim() })
    : await Order.find({ _id })
  if (userOrders?.length) {
    res.json({
      success: true,
      orders: userOrders,
    })
  } else {
    res.status(404).json({
      success: false,
      msg: 'no data found',
    })
  }
}

exports.delete = async (req, res, next) => {
  const id = req.params.id
  const order = await Order.findById(id)
  if (order) {
    try {
      await order.remove()
      const orderList = await Order.find()
      res.json({
        success: true,
        msg: 'Successfully Deleted!',
        orders: orderList,
      })
    } catch (err) {
      res.json({
        success: false,
        error: err,
      })
    }
  } else {
    res.json({
      success: false,
      msg: 'order not found !',
    })
  }
}

exports.update = async (req, res, next) => {
  const id = req.params.id
  const status = req.body.status
  Order.findByIdAndUpdate(id, { status })
    .then((result) => {
      res.json({
        message: 'successfully updated status',
        result,
      })
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
}

exports.updateMany = async (req, res, next) => {
  try {
    const { orders } = req.body
    await Order.updateMany(
      { _id: { $in: orders } },
      { status: 'processing' },
      { multi: true },
      (err, doc) => {
        if (err) {
          return console.log(err)
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
}
