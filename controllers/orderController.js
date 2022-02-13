const Order = require( '../models/order' );
const Book = require( '../models/book' );
exports.add = async ( req, res, next ) =>
{
    const data = req.body;
    await Order.insertMany( data, ( err, doc ) =>
    {
        if ( err )
        {
            res.json( {
                success: false,
                msg: "Can't added order data !",
            } )
        } else
        {
            res.send( {
                success: true,
                msg: "Order Successfully Added",
                doc
            } );
        }

    } );
}


exports.all = async ( req, res, next ) =>
{
    const orders = Order.find();


    if ( !orders.length )
    {
        res.json( {
            success: false,
            msg: "No data found !"
        } )
    }
    else
    {
        res.json( {
            success: true,
            msg: `Got ${orders.length} order items`,
            orders
        } )
    }

}


exports.filterStatus = async ( req, res, next ) =>
{
    const { status } = req.params;
    const orders = Order.find( { status: status } );

    if ( !orders.length )
    {
        res.json( {
            success: false,
            msg: "No data found !"
        } )
    }
    else
    {
        res.json( {
            success: true,
            msg: `Got ${orders.length} ${status} order items`,
            orders
        } )
    }

}


exports.buyingList = ( req, res, next ) =>
{
    Order.find( { status: "Processing" } ).then( ( result ) =>
    {
        if ( !result.length )
        {
            const err = new Error( "Not Found" );
            next( err );
        }
        else
        {
            const data = result;
            let booksId = [];
            booksId = data.map( ( d ) =>
            {
                return d.bookId;
            } );
            booksId = [ ...new Set( booksId ) ];
            const booksOrders = booksId.map( bookId =>
            {
                let quantity = 0;
                const similarOrders = data?.filter( ( d ) => d.bookId === bookId );
                similarOrders.map( ( d ) =>
                {
                    quantity = quantity + Number( d.quantity );
                } );
                return {
                    id: bookId, quantity
                }
            } );
            Book.find().then( booksData =>
            {
                const buyingList = booksOrders.map( ( d ) =>
                {
                    const bookDetails = booksData.find( bookData => bookData._id.toString() === d.id );
                    const { title, author, price, discount } = bookDetails;
                    const discountedPrice = price - price * discount / 100;
                    return { ...d, title, author, price: discountedPrice, totalPrice: discountedPrice * d.quantity };
                } );

                let TotalCost = 0;
                buyingList.map( d => TotalCost = TotalCost + d.totalPrice );

                res.json( {
                    message: "Order List Found",
                    totalCost: TotalCost,
                    buyingList: buyingList,

                } )
            } )

        }
    } ).catch( err =>
    {
        res.json( {
            success: false,
            msg: "something went wrong !"
        } )
    } );
}

exports.userOrder = ( req, res, next ) =>
{
    const email = req.params.email;

    Order.find().then( ( result ) =>
    {
        if ( !result.length )
        {
            const err = new Error( "Not Found" );
            res.send( { message: "not FOund" } );
        }
        else
        {
            const userData = result.filter( d => d.user.email === email );
            res.json( {
                message: "Order List Found",
                order: userData,
            } )
        }
    } ).catch( err =>
    {
        res.json( err )
        next( err );
    } );
};

exports.delete = ( req, res, next ) =>
{
    const id = req.params.id.toString();
    Order.findByIdAndRemove( id ).then( result =>
    {
        res.json( {
            message: "sucessfully Deleted ",
            result,
        } )
    } )
        .catch( ( err ) =>
        {
            console.log( err );
            next( err )
        } )
}
exports.update = ( req, res, next ) =>
{
    const id = req.params.id;
    const status = req.body.status;
    Order.findByIdAndUpdate( id, { status } ).then( result =>
    {
        res.json( {
            message: "successfully updated status",
            result,
        } )
    } )
        .catch( ( err ) =>
        {
            console.log( err );
            next( err )
        } )
}