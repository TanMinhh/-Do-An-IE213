const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
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
const productRoute = require('./routes/product.route.js');
const userRoute = require('./routes/user.route.js');
const analyticRoute = require('./routes/analytic.route.js');
const categoryRoute = require('./routes/category.route.js');
const messageRoute = require('./routes/message.route.js');
const notificationRoute = require('./routes/notification.route.js');
const orderRoute = require('./routes/order.route.js');
const promotionRoute = require('./routes/promotion.route.js');
const reviewRoute = require('./routes/review.route.js');
const storeRoute = require('./routes/store.route.js');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
dotenv.config();

// JWT
function authenToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log(err, data);
        if (err) return res.sendStatus(403);
        next();
    });
}

app.get('/', (req, res) => {
    res.send("Hello from node API server");
});

// Routes
app.use("/api/products", authenToken, productRoute);
app.use("/api/users", authenToken, userRoute);
app.use("/api/analytics", authenToken, analyticRoute);
app.use("/api/categories", authenToken, categoryRoute);
app.use("/api/messages", authenToken, messageRoute);
app.use("/api/notifications", authenToken, notificationRoute);
app.use("/api/orders", authenToken, orderRoute);
app.use("/api/promotions", authenToken, promotionRoute);
app.use("/api/reviews", authenToken, reviewRoute);
app.use("/api/stores", authenToken, storeRoute);

mongoose.connect("mongodb+srv://hobbeeadmin:lzIpOcBbTtkBUBzc@hobbeedatabase.6asxc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=HobbeeDatabase")
.then(() => {
    console.log("Connected to database!");
    app.listen(80, () => {
        console.log('Server is running on port 80');
    });
})
.catch(() => {
    console.log("Connection failed!");
})
