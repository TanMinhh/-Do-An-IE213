const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

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
app.use(cors());app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("Hello from node API server");
});

// Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/analytics", analyticRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/messages", messageRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/promotions", promotionRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/stores", storeRoute);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("Connection failed!", error);
});
