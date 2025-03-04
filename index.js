const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
const Analytic = require('./models/analytic.model.js');
const Category = require('./models/category.model.js');
const Message = require('./models/message.model.js');
const Notification = require('./models/notification.model.js');
const Order = require('./models/order.model.js');
const Promotion = require('./models/promotion.model.js');
const Review = require('./models/review.model.js');
const Store = require('./models/store.model.js');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from node API server");
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/analytics', async (req, res) => {
    try {
        const analytic = await Analytic.create(req.body);
        res.status(200).json(analytic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/notifications', async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/promotions', async (req, res) => {
    try {
        const promotion = await Promotion.create(req.body);
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/stores', async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://hobbeeadmin:lzIpOcBbTtkBUBzc@hobbeedatabase.6asxc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=HobbeeDatabase")
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed!");
})