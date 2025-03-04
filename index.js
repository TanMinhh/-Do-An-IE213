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
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("Hello from node API server");
});

// Product Sections
app.get('/api/products', async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/product/:id', async (req, res) => {
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
});

app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({message: "Product deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//User section
app.get('/api/users', async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
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

//Analytic section
app.get('/api/analytics', async (req, res) => {
    try {
        const analytic = await Analytic.find({});
        res.status(200).json(analytic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/analytic/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const analytic = await Analytic.findById(id);
        res.status(200).json(analytic);
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

//Category section
app.get('/api/categories', async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        res.status(200).json(category);
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

//Message section
app.get('/api/messages', async (req, res) => {
    try {
        const message = await Message.find({});
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/message/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        res.status(200).json(message);
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

//Notification section
app.get('/api/notifications', async (req, res) => {
    try {
        const notification = await Notification.find({});
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/notification/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        res.status(200).json(notification);
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

//Order section
app.get('/api/orders', async (req, res) => {
    try {
        const order = await Order.find({});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        res.status(200).json(order);
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

//Promotion section
app.get('/api/promotions', async (req, res) => {
    try {
        const promotion = await Promotion.find({});
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/promotion/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findById(id);
        res.status(200).json(promotion);
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

//Review section
app.get('/api/reviews', async (req, res) => {
    try {
        const review = await Review.find({});
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/review/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        res.status(200).json(review);
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

//Store section
app.get('/api/stores', async (req, res) => {
    try {
        const store = await Store.find({});
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/store/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findById(id);
        res.status(200).json(store);
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