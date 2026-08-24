const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Project = require("../models/project");


// ==========================================
// GET ALL PROJECTS
// GET /api/projects
// ==========================================

router.get("/", async (req, res) => {
    try {
        const projects = await Project
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(projects);

    } catch (error) {
        console.error("Error fetching projects:", error);

        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message
        });
    }
});


// ==========================================
// GET ONE PROJECT
// GET /api/projects/:id
// ==========================================

router.get("/:id", async (req, res) => {
    try {

        // Check whether ID is a valid MongoDB ID
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(project);

    } catch (error) {
        console.error("Error fetching project:", error);

        res.status(500).json({
            message: "Failed to fetch project",
            error: error.message
        });
    }
});


// ==========================================
// CREATE PROJECT
// POST /api/projects
// ==========================================

router.post("/", async (req, res) => {
    try {

        const {
            title,
            description,
            technologies,
            image,
            githubUrl,
            liveUrl
        } = req.body;


        // Validate required fields
        if (
            !title ||
            !description ||
            !technologies
        ) {
            return res.status(400).json({
                message:
                    "Title, description and technologies are required"
            });
        }


        // Technologies should be an array
        if (!Array.isArray(technologies)) {
            return res.status(400).json({
                message:
                    "Technologies must be an array"
            });
        }


        const project = new Project({
            title: title,
            description: description,
            technologies: technologies,
            image: image || "",
            githubUrl: githubUrl || "",
            liveUrl: liveUrl || ""
        });


        const savedProject = await project.save();


        res.status(201).json({
            message: "Project created successfully",
            project: savedProject
        });

    } catch (error) {

        console.error("Error creating project:", error);

        res.status(500).json({
            message: "Failed to create project",
            error: error.message
        });
    }
});


// ==========================================
// UPDATE PROJECT
// PUT /api/projects/:id
// ==========================================

router.put("/:id", async (req, res) => {
    try {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }


        const updatedProject =
            await Project.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!updatedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }


        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject
        });

    } catch (error) {

        console.error("Error updating project:", error);

        res.status(500).json({
            message: "Failed to update project",
            error: error.message
        });
    }
});


// ==========================================
// DELETE PROJECT
// DELETE /api/projects/:id
// ==========================================

router.delete("/:id", async (req, res) => {
    try {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }


        const deletedProject =
            await Project.findByIdAndDelete(
                req.params.id
            );


        if (!deletedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }


        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {

        console.error("Error deleting project:", error);

        res.status(500).json({
            message: "Failed to delete project",
            error: error.message
        });
    }
});


module.exports = router;