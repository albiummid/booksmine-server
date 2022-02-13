const express = require( 'express' );
const router = express.Router();


const courseController = require( '../controllers/courseController' );

router.post( '/add', courseController.addCourse );
router.patch( '/update', courseController.updateCourse )
router.delete( '/delete', courseController.deleteCourse )


module.exports = router;
