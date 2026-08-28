const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

// ==========================================
// POST /api/contact - Save to MongoDB
// ==========================================

router.post("/", async (req, res) => {
    try {

        const name = req.body?.name
            ? String(req.body.name).trim()
            : "";

        const email = req.body?.email
            ? String(req.body.email).trim()
            : "";

        const message = req.body?.message
            ? String(req.body.message).trim()
            : "";


        // ==========================================
        // VALIDATE REQUIRED FIELDS
        // ==========================================

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, message) are required."
            });
        }


        // ==========================================
        // VALIDATE EMAIL
        // ==========================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }


        // ==========================================
        // SAVE TO MONGODB
        // ==========================================

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();


        console.log(
            `✅ New message saved from: ${name} (${email})`
        );


        // ==========================================
        // SUCCESS RESPONSE
        // ==========================================

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!"
        });


    } catch (error) {

        console.error(
            "❌ Contact route error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to save message. Please try again later."
        });
    }
});


module.exports = router;