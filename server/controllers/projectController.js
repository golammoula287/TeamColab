import asyncHandler from "express-async-handler"
import Project from "../models/Project.js"

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = asyncHandler(async (req, res) => {
    const { projectName, invoiceId, rate } = req.body

    const project = new Project({
        projectName,
        invoiceId,
        rate,
        costs: [],
    })

    const createdProject = await project.save()
    res.status(201).json(createdProject)
})

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
export const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({})
    res.json(projects)
})

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project) {
        res.status(404)
        throw new Error("Project not found")
    }

    res.json(project)
})

// @desc    Add a cost entry to a project
// @route   POST /api/projects/:id/costs
// @access  Private
export const addCostToProject = asyncHandler(async (req, res) => {
    const { amount, description } = req.body
    const project = await Project.findById(req.params.id)

    if (!project) {
        res.status(404)
        throw new Error("Project not found")
    }

    project.costs.push({ amount, description })
    const updatedProject = await project.save()

    res.json(updatedProject)
})

// @desc    Update a specific cost
// @route   PUT /api/projects/:projectId/costs/:costId
// @access  Private
export const updateCost = asyncHandler(async (req, res) => {
    const { amount, description } = req.body
    const project = await Project.findById(req.params.projectId)

    if (!project) {
        res.status(404)
        throw new Error("Project not found")
    }

    const cost = project.costs.id(req.params.costId)

    if (!cost) {
        res.status(404)
        throw new Error("Cost not found")
    }

    cost.amount = amount ?? cost.amount
    cost.description = description ?? cost.description

    const updatedProject = await project.save()
    res.json(updatedProject)
})

// @desc    Delete a specific cost
// @route   DELETE /api/projects/:projectId/costs/:costId
// @access  Private
export const deleteCost = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.projectId)

    if (!project) {
        res.status(404)
        throw new Error("Project not found")
    }

    const cost = project.costs.id(req.params.costId)

    if (!cost) {
        res.status(404)
        throw new Error("Cost not found")
    }

    cost.remove()
    const updatedProject = await project.save()
    res.json(updatedProject)
})

// @desc    Update project details (e.g. name, rate)
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project) {
        res.status(404)
        throw new Error("Project not found")
    }

    project.projectName = req.body.projectName || project.projectName
    project.invoiceId = req.body.invoiceId || project.invoiceId
    project.rate = req.body.rate ?? project.rate

    const updatedProject = await project.save()
    res.json(updatedProject)
})

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project) {
        res.status(404)
        throw new Error("Project not found")
    }

    await project.remove()
    res.json({ message: "Project removed" })
})
