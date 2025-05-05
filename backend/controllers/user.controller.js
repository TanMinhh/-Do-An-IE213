const User = require('../models/user.model.js');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const getUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const exists = await User.findOne({email});
        if(exists) {
            return res.json({success: false, message:"User already exists"})
        }
        if(!validator.isEmail(email)) {
            return res.json({success: false, message:"Please enter a valid email"})
        }
        if(password.length < 8) {
            return res.json({success: false, message:"Please enter a strong/longer password"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false, message:"User doesn't exist!"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        }else {
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const adminLogin = async (req, res) =>{
    try {
        const {email,password} = req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
        }else {
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await User.findById(id);
        res.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    adminLogin,
    loginUser
};
