const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2h' });
}


// register user
exports.registerUser = async (req, res) => {
    const {
        fullName,
        email, 
        password,
        profileImageUrl
    } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: 'Error Existing User', error: error.message });
    }
};

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: 'Error logging in',error: error.message });
    }
};

// get user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user info', error: error.message });
    }

};