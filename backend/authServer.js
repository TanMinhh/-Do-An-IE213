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
const cartRoute = require('./routes/cart.route.js')
const app = express();
const cors = require('cors');
const connectCloudinary = require('./config/cloudinary.js')

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
dotenv.config();

app.get('/', (req, res) => {
    res.send("Hello from node API server");
});

// JWT
let refreshTokens = [];

app.post('/api/refreshToken', (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        console.log(err, data);
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
        res.json({ accessToken });
    });
});

app.post('/api/login', (req, res) => {
    const data = req.body;
    console.log({ data });
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
});

app.post('/api/logout', (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(refToken => refToken !== refreshToken);
    res.sendStatus(200);
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
app.use("/api/carts", cartRoute);

mongoose.connect("mongodb+srv://hobbeeadmin:lzIpOcBbTtkBUBzc@hobbeedatabase.6asxc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=HobbeeDatabase")
.then(() => {
    console.log("Connected to database!");
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
})
.catch(() => {
    console.log("Connection failed!");
})

connectCloudinary()