const express = require( 'express' );
const router = express.Router();
const { singleUpload } = require( '../utils/multer' );

const bookController = require( '../controllers/bookController' );


// Route => /api/v1/book/

router.post( '/add', singleUpload, bookController.addBook )
router.get( '/all', bookController.getAllBooks )
router.get( '/:bookId', bookController.findBook )
router.patch( '/:bookId', singleUpload, bookController.updateBook )
router.delete( '/:bookId', bookController.deleteBook )



module.exports = router;
