import express from "express"
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addCostToProject,
    updateCost,
    deleteCost,
} from "../controllers/projectController.js"

const router = express.Router()

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public or Protected
router.get("/", getProjects)

// @route   POST /api/projects
// @desc    Create new project
// @access  Public or Protected
router.post("/", createProject)

// @route   GET /api/projects/:id
// @desc    Get a single project by ID
// @access  Public or Protected
router.get("/:id", getProjectById)

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Protected
router.put("/:id", updateProject)

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Protected
router.delete("/:id", deleteProject)

// @route   POST /api/projects/:id/costs
// @desc    Add a cost to a project
// @access  Protected
router.post("/:id/costs", addCostToProject)

// @route   PUT /api/projects/:projectId/costs/:costId
// @desc    Update a specific cost in a project
// @access  Protected
router.put("/:projectId/costs/:costId", updateCost)

// @route   DELETE /api/projects/:projectId/costs/:costId
// @desc    Delete a specific cost in a project
// @access  Protected
router.delete("/:projectId/costs/:costId", deleteCost)

export default router
