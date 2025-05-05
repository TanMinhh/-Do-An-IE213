const Product = require('../models/product.model.js')
const {v2: cloudinary} = require('cloudinary')

const addProduct = async (req, res) => {
    try {
        const {name, description, price, category} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        console.log(name, description, price, category)
        console.log(imagesUrl)

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            images: imagesUrl,
            date: Date.now()
        }

        const product = new Product(productData);
        await product.save()

        res.json({success:true,message:"Product Added!"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};

const listProducts = async(req, res) => {
    try{
        const product = await Product.find({});
        res.json({success:true, product})
    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
};

const searchProducts = async (req, res) => {
    try {
        const { tags, categoryId, storeId, minPrice, maxPrice, minRating, maxRating } = req.query;
        let filters = {};

        // Tìm kiếm sản phẩm theo các tag
        if (tags) {
            filters.tags = { $in: tags.split(',') };
        }

        // Tìm kiếm sản phẩm theo categoryId
        if (categoryId) {
            filters.categoryId = categoryId;
        }

        // Tìm kiếm sản phẩm theo storeId
        if (storeId) {
            filters.storeId = storeId;
        }

        // Lọc sản phẩm theo giá
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = parseFloat(minPrice);
            if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
        }

        // Loc sản phẩm theo rating
        if (minRating || maxRating) {
            filters.rating = {};
            if (minRating) filters.rating.$gte = parseFloat(minRating);
            if (maxRating) filters.rating.$lte = parseFloat(maxRating);
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }
        res.json({ success: true, message: "Product deleted!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

module.exports = {
    addProduct,
    listProducts,
    searchProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
