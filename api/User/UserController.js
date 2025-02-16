const User = require('./UserModel.js');

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

module.exports = {
    register,
};

