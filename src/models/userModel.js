const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    isActive: { type: Boolean, default: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    role: { type: String, enum: ["teacher", "admin"], default: "teacher"},
    createdAt: { type: String, default: Date.now},
    profileImage: { type: String, required: false, default: "https://blis.com/wp-content/uploads/2024/03/user-icon-copy.webp"},
    phone: { type: String, required: false}
})

module.exports = mongoose.model('tatuUser', userModel);