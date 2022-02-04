const app = require( './app' );
const dotenv = require( 'dotenv' );
const connectDatabase = require( './config/database' );

// setting up config file
dotenv.config( { path: './config/config.env' } )

// Connecting To DATABASE
connectDatabase();


app.listen( process.env.PORT, () =>
{
    console.log( `Server started on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.` );
} )