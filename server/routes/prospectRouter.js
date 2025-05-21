import express from "express"
import {
    createProspect,
    getAllProspects,
    getProspectById,
    updateProspect,
    deleteProspect,
    convertProspectToClient,

} from "../controllers/prospectController.js"


const router = express.Router()

// @route   GET /api/prospects
// @desc    Get all prospects
// @access  Public or Protected (based on your needs)
router.get("/", getAllProspects)

// @route   POST /api/prospects
// @desc    Create new prospect
// @access  Public or Protected
router.post("/", createProspect)

// @route   GET /api/prospects/:id
// @desc    Get a single prospect by ID
// @access  Public or Protected
router.get("/:id", getProspectById)

// @route   PUT /api/prospects/:id
// @desc    Update a prospect
// @access  Protected
router.put("/:id", updateProspect)

// @route   DELETE /api/prospects/:id
// @desc    Delete a prospect
// @access  Protected
router.delete("/:id", deleteProspect)

router.post("/convert/:id", convertProspectToClient)

export default router
