const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '--' + file.originalname)
  },
})

exports.singleUpload = multer({ storage }).single('file')
exports.multiUpload = multer({ storage }).array(10, 'files')
