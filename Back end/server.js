const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("=================================");
        console.log("MongoDB Atlas connected successfully");
        console.log("=================================");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});