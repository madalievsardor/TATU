const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, username: user.username}, process.env.JWT_SECRET, { expiresIn: "7d"}
    )
}
// Register Controller
const register = async (req, res) => {
    const { firstName, lastName, email, gender, profileImage, password, phone, username } = req.body;
    if (!firstName || !lastName || !email || !password || !username) {
        return res.status(400).json({ message: "Provide all fields" });
    }

    try {
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const newUser = new userModel({
            firstName,
            lastName,
            email,
            gender,
            profileImage,
            password: hashedPassword,
            phone,
            username,
        });
        await newUser.save();
        
        const token = generateToken(newUser);

        return res.status(201).json({ message: "User registered successfully", user: { _id: newUser._id, username: newUser.username, email: newUser.email}, token });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: "User logged in successfully.",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// Get All Users Controller
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("_id username email");
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {register,login,getUsers};
