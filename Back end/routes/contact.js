const express = require("express");

const router = express.Router();


// ==========================================
// CONTACT FORM
// POST /api/contact
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            message
        } = req.body;


        // Check required fields

        if (!name || !email || !message) {

            return res.status(400).json({
                message:
                    "Name, email and message are required"
            });

        }


        // Check email

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            return res.status(400).json({
                message:
                    "Please enter a valid email address"
            });

        }


        // Display message in terminal

        console.log("");
        console.log("=================================");
        console.log("NEW CONTACT MESSAGE");
        console.log("=================================");

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        console.log("=================================");
        console.log("");


        res.status(200).json({
            message:
                "Your message has been received successfully!"
        });

    } catch (error) {

        console.error(
            "Contact form error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to process contact message"
        });

    }

});


module.exports = router;