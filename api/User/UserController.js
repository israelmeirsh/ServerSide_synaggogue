const User = require('./UserModel.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { phone } = req.body;
        const user = await User.findOne({ phone });

        if (user) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error registering user' });
    }
};



const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Incorrect phone or password' });
        }
        const isMatch = await require('bcrypt').compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect phone or password' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error logging in user' });
    }
};

module.exports = {
    register,
    login
};

