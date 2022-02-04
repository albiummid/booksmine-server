exports.getProducts = (req,res,next) =>{
    res.status(200).json({
        success:true,
        messeage:"This route will provide all products in database"
    })
}