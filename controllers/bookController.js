const Book = require('../models/book')
const cloudinary = require('cloudinary')

// Add book => api/v1/book
exports.addBook = async (req, res, next) => {
  const filePath = req?.file?.path

  if (req.body?.imgUrl) {
    const book = await Book.create({
      ...req.body,
    })
    res.json({
      success: true,
      msg: 'Successfully added a book !',
      book,
    })
  } else {
    try {
      const { secure_url } = await cloudinary.v2.uploader.upload(filePath, {
        folder: 'bookImages',
        public_id: `${Date.now()}`,
        resource_type: 'auto',
        width: 300,
        crop: 'scale',
      })

      const book = await Book.create({ ...req.body, imgUrl: secure_url })

      res.status(200).json({
        success: true,
        msg: 'Successfully added a book !',
        book,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find()
  if (!books.length) {
    res.json({
      success: false,
      msg: 'No books found in the database !',
      books,
    })
  } else {
    let sorted = books?.sort((a, b) => a.title.localeCompare(b.title))
    res.status(200).json({
      success: true,
      msg: `Books found ${books.length} pieces`,
      books: sorted,
    })
  }
}

exports.findBook = async (req, res, next) => {
  const bookId = req.params.bookId
  const book = await Book.findById(bookId)
  if (!book) {
    res.status(404).json({
      success: false,
      msg: `This book doesn't exist anymore !`,
    })
  } else {
    res.status(200).json({
      success: true,
      msg: 'Found the book !',
      book: book,
    })
  }
}
exports.deleteBook = async (req, res, next) => {
  const bookId = req.params?.bookId
  const book = await Book.findById(bookId)
  if (!book) {
    res.status(404).json({
      success: false,
      msg: `This book doesn't exist anymore !`,
    })
  } else {
    book?.remove()
    res.status(200).json({
      success: true,
      msg: 'Book Deleted Successfully',
    })
  }
}

exports.updateBook = async (req, res, next) => {
  const bookId = req.params.bookId
  const exists = await Book.findById(bookId)
  const data = req.body
  if (!exists) {
    res.status(404).json({
      success: false,
      msg: 'Book not found for update !',
    })
  } else {
    if (req.file) {
      const { secure_url } = await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: 'bookImages',
          public_id: `${Date.now()}`,
          resource_type: 'auto',
          width: 300,
          crop: 'scale',
        }
      )
      const imgUrl = secure_url
      const book = await Book.findByIdAndUpdate(
        bookId,
        { ...req.body, imgUrl },
        {
          new: true,
          runValidators: true,
        }
      )
      res.status(200).json({
        success: true,
        msg: 'Data successfully updated !',
        book,
      })
    } else {
      const book = await Book.findByIdAndUpdate(
        bookId,
        { ...data },
        {
          new: true,
          runValidators: true,
        }
      )

      if (!book) {
        res.status(404).json({
          success: false,
          msg: 'book not found for update',
        })
      }
      res.status(200).json({
        success: true,
        msg: 'Book updated Successfully',
      })
    }
  }
}
