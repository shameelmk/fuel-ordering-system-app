import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import { generateToken } from '../utils/util.js'

// @desc Register new user
// @route POST /api/users/signup
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    if(!name || !email || !password || !phoneNumber ) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword,
        phoneNumber,
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name,
            email,
            phoneNumber,
            token: generateToken(user._id, 'user')
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id, 'user'),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Logout user
// @route GET /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: '1234'}, process.env.JWT_SECRET, {
        expiresIn: 1,
    })
    res.status(200).json({
        message: 'User successfully logged out',
        token,
    });
})

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, phoneNumber } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email,
        phoneNumber,
    })
})

// @desc Update user profile
// @route PATCH /api/users/update-profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    // Check for user
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true });
    res.status(200).json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
    })
})

// @desc Get list of all users
// @route GET /api/users
// @access public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

const setLocation = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(404) 
        throw new Error('User not found')
    }

    const userWithLocation = await User.findByIdAndUpdate(req.user.id, { $set: { 'location.latitude': latitude, 'location.longitude': longitude }}, { new: true }).select('-password')

    res.status(200).json(userWithLocation)
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    setLocation,
}