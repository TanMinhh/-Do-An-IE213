const { v2: cloudinaryV2 } = require('cloudinary');

const connectCloudinary = async() => {
    cloudinaryV2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}

module.exports = connectCloudinary;