const User = require('../models/user.model.js')

const addToCart = async (req, res) => {
    try {
        const {userId, itemId} = req.body

        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await User.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"Added To Cart!"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const updateCart = async (req, res) => {
    try {
        const {userId, itemId, quantity} = req.body
        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId] = quantity

        await User.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"Cart Updated!"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body
        const userData = await User.findById(userId)
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

module.exports = {
    addToCart,
    updateCart,
    getUserCart
};