const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
    console.log("Server running http://localhost:8000")
})