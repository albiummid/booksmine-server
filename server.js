const app = require( './app' );
const dotenv = require( 'dotenv' );
const connectDatabase = require( './config/database' );
const cloudinary = require( 'cloudinary' )

// setting up config file
dotenv.config( { path: './config/config.env' } )

// setting up cloudinary
cloudinary.config( {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
} );



// Connecting To DATABASE
connectDatabase();


app.listen( process.env.PORT, () =>
{
    console.log( `Server started on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.` );
} )
