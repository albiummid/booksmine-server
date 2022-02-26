const Order = require('../models/order')
const Book = require('../models/book')
exports.add = async (req, res, next) => {
  const data = req.body

  const newOrder = new Order({ ...data })
  console.log(newOrder)
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

exports.buyingList = (req, res, next) => {
  Order.find({ status: 'processing' })
    .then((result) => {
      if (!result.length) {
        const err = new Error('Not Found')
        next(err)
      } else {
        const data = result
        let booksId = []
        booksId = data.map((d) => {
          return d.bookId
        })
        booksId = [...new Set(booksId)]
        const booksOrders = booksId.map((bookId) => {
          let quantity = 0
          const similarOrders = data?.filter((d) => d.bookId === bookId)
          similarOrders.map((d) => {
            quantity = quantity + Number(d.quantity)
          })
          return {
            id: bookId,
            quantity,
          }
        })
        Book.find().then((booksData) => {
          const buyingList = booksOrders.map((d) => {
            const bookDetails = booksData.find(
              (bookData) => bookData._id.toString() === d.id
            )
            const { title, author, price, discount } = bookDetails
            const discountedPrice = price - (price * discount) / 100
            return {
              ...d,
              title,
              author,
              price: discountedPrice,
              totalPrice: discountedPrice * d.quantity,
            }
          })

          let TotalCost = 0
          buyingList.map((d) => (TotalCost = TotalCost + d.totalPrice))

          res.json({
            message: 'Order List Found',
            totalCost: TotalCost,
            buyingList: buyingList,
          })
        })
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: 'something went wrong !',
      })
    })
}

exports.userOrder = async (req, res, next) => {
  const { email, _id } = req.query
  console.log(email, _id)
  const userOrders = email?.length
    ? await Order.find({ email })
    : await Order.find({ _id })
  if (userOrders?.length) {
    res.json({
      success: true,
      orders: userOrders,
    })
  } else {
    res.status(404).json({
      success: false,
      msg: 'no data found ',
    })
  }
}

exports.delete = (req, res, next) => {
  const id = req.params.id.toString()
  Order.findByIdAndRemove(id)
    .then((result) => {
      res.json({
        message: 'sucessfully Deleted ',
        result,
      })
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
}
exports.update = (req, res, next) => {
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
