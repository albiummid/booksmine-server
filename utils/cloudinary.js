// const cloudinary = require( 'cloudinary' );
// exports.cloudUploader = async ( filePath, folder = 'temp', width = 300 ) =>
// {
//     const { secure_url } = await cloudinary.v2.uploader.upload( filePath, {
//         folder: folder,
//         public_id: `${Date.now()}`,
//         resource_type: "auto",
//         width: width,
//         crop: "scale"
//     } )

//     console.log( secure_url, 'Done' );

//     return secure_url
// }