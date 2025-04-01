const jwt = require('jsonwebtoken');

// Middleware xác thực token
const authenticateToken = (req, res, next) => {
    const token = req.query.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gắn thông tin người dùng vào req
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Middleware kiểm tra vai trò
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
        }
        next();
    };
};

// Middleware kiểm tra quyền sở hữu
const checkOwnership = (model, field) => {
    return async (req, res, next) => {
        try {
            const resource = await model.findOne({ _id: req.params.id, [field]: req.user._id });
            if (!resource) {
                return res.status(403).json({ message: 'Access denied. You do not own this resource.' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};

module.exports = { authenticateToken, authorizeRoles, checkOwnership };