const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Contact = require("../models/contact");

// ==========================================
// TEST CONTACT API
// GET /api/contact/test
// ==========================================

router.get("/test", (req, res) => {
    res.status(200).json({
        message: "Contact API is working"
    });
});

// ==========================================
// CREATE CONTACT MESSAGE
// POST /api/contact
// ==========================================

router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email and message are required"
            });
        }

        const contact = new Contact({
            name: name.trim(),
            email: email.trim(),
            message: message.trim()
        });

        const savedContact = await contact.save();

        res.status(201).json({
            message: "Message sent successfully",
            contact: savedContact
        });

    } catch (error) {
        console.error("Error saving contact:", error);

        res.status(500).json({
            message: "Failed to send message",
            error: error.message
        });
    }
});

// ==========================================
// GET ALL CONTACT MESSAGES
// GET /api/contact
// ==========================================

router.get("/", async (req, res) => {
    try {
        const contacts = await Contact
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(contacts);

    } catch (error) {
        console.error("Error fetching contacts:", error);

        res.status(500).json({
            message: "Failed to fetch contact messages",
            error: error.message
        });
    }
});

// ==========================================
// DELETE CONTACT MESSAGE
// DELETE /api/contact/:id
// ==========================================

router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid contact ID"
            });
        }

        const deletedContact =
            await Contact.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return res.status(404).json({
                message: "Contact message not found"
            });
        }

        res.status(200).json({
            message: "Contact message deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting contact:", error);

        res.status(500).json({
            message: "Failed to delete contact message",
            error: error.message
        });
    }
});

module.exports = router;