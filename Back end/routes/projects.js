const express = require("express");
const router = express.Router();

const Project = require("../models/project");


router.get("/", async (req, res) => {
    try {

        const projects = await Project.find();

        res.json(projects);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch projects"
        });

    }
});


router.post("/", async (req, res) => {
    try {

        const project = new Project(req.body);

        const savedProject = await project.save();

        res.status(201).json(savedProject);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create project"
        });

    }
});


module.exports = router;