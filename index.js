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

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("Hello from node API server");
});

// Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/analytics", analyticRoute);
app.use("/api/categories", analyticRoute);
app.use("/api/messages", analyticRoute);
app.use("/api/notifications", analyticRoute);
app.use("/api/orders", analyticRoute);
app.use("/api/promotions", analyticRoute);
app.use("/api/reviews", analyticRoute);
app.use("/api/stores", analyticRoute);

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