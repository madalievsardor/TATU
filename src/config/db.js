const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()
const conectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Error: ", error);
        process.exit(1);
    }
};

module.exports = conectDB;