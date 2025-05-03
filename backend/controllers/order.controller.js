const Order = require('../models/order.model.js');
const User = require('../models/user.model.js');
const stripe = require('stripe')('sk_test_51RKVr4E895fEcCCuSWMEyqEVuseZnIFOoYDDqCfVOhsGGeFKEw7QTJIinJw0U8EBmG9X8wvBEuTQg2k8gkWJCk1d00x2iW06M7');

const currency = 'usd'
const deliveryCharge = 10


const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()
        await User.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success:true, message:"Order placed!"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};

const placeOrderStripe = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const { origin } = req.headers;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
};

const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body
    try {
        if(success === "true"){
            await Order.findByIdAndUpdate(orderId, {payment:true});
            await User.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true})
        } else {
            await Order.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
};

const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await Order.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
};

const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body
        await Order.findByIdAndUpdate(orderId, {status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        const updatedOrder = await Order.findById(id);
        res.status(200).json({message: "Order deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    deleteOrder,
    verifyStripe
};