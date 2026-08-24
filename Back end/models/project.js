const mongoose = require("mongoose");


// ==========================================
// PROJECT SCHEMA
// ==========================================

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        technologies: {
            type: [String],
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        githubUrl: {
            type: String,
            default: ""
        },

        liveUrl: {
            type: String,
            default: ""
        }
    },

    {
        timestamps: true
    }
);


// ==========================================
// EXPORT MODEL
// ==========================================

const Project = mongoose.model(
    "Project",
    projectSchema
);

module.exports = Project;