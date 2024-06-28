const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Create a new user
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();

        res.send({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error changing password', error });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching profile', error });
    }
};

const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPass
            }
        });

        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'Password Recovery',
            text: `Click the link to reset your password: ${req.headers.origin}/reset-password.html?token=${token}`
        };

        await transporter.sendMail(mailOptions);

        res.send({ message: 'Password recovery email sent' });
    } catch (error) {
        res.status(500).send({ message: 'Error sending recovery email', error });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const decoded = jwt.verify(token, config.jwtSecret);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        res.send({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error resetting password', error });
    }
};

const verifyToken = (req, res) => {
    res.status(200).send({ message: 'Token is valid' });
};

module.exports = {
    register,
    login,
    changePassword,
    getProfile,
    recoverPassword,
    resetPassword,
    verifyToken
};
