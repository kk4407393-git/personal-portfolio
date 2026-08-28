const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Portfolio backend is running successfully",
        status: "OK"
    });
});


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);


// ==========================================
// 404 ROUTE
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found",
        path: req.originalUrl
    });
});


// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(500).json({
        message: "Internal server error",
        error: err.message
    });
});


// ==========================================
// PORT
// ==========================================

const PORT = process.env.PORT || 5000;


// ==========================================
// MONGODB URI
// ==========================================

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("ERROR: MONGODB_URI is missing");
    process.exit(1);
}


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// ==========================================
// CONNECT TO MONGODB
// ==========================================

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("=================================");
        console.log("MongoDB Atlas connected successfully");
        console.log("=================================");
    })
    .catch((error) => {
        console.error("=================================");
        console.error("MongoDB connection failed:");
        console.error(error.message);
        console.error("=================================");
    });