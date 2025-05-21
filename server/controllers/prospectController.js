// import Prospect from "../models/prospect.js"

// export const createProspect = async (req, res) => {
//     try {
//         const { name, companyName, email, number, description } = req.body

//         const existing = await Prospect.findOne({ email })
//         if (existing) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Prospect already exists with this email.",
//             })
//         }

//         const prospect = await Prospect.create({
//             name,
//             companyName,
//             email,
//             number,
//             description,
//         })

//         res.status(201).json({
//             status: true,
//             message: "Prospect created successfully.",
//             prospect,
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ status: false, message: error.message })
//     }
// }

// export const getAllProspects = async (req, res) => {
//     try {
//         const prospects = await Prospect.find()
//         res.status(200).json(prospects)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ status: false, message: error.message })
//     }
// }

// export const getProspectById = async (req, res) => {
//     try {
//         const { id } = req.params
//         const prospect = await Prospect.findById(id)

//         if (!prospect) {
//             return res.status(404).json({ status: false, message: "Prospect not found" })
//         }

//         res.status(200).json(prospect)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ status: false, message: error.message })
//     }
// }

// export const updateProspect = async (req, res) => {
//     try {
//         const { id } = req.params
//         const prospect = await Prospect.findById(id)

//         if (!prospect) {
//             return res.status(404).json({ status: false, message: "Prospect not found" })
//         }

//         const { name, companyName, email, number, description } = req.body

//         prospect.name = name || prospect.name
//         prospect.companyName = companyName || prospect.companyName
//         prospect.email = email || prospect.email
//         prospect.number = number || prospect.number
//         prospect.description = description || prospect.description

//         const updated = await prospect.save()

//         res.status(200).json({
//             status: true,
//             message: "Prospect updated successfully.",
//             prospect: updated,
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ status: false, message: error.message })
//     }
// }

// export const deleteProspect = async (req, res) => {
//     try {
//         const { id } = req.params
//         await Prospect.findByIdAndDelete(id)

//         res.status(200).json({
//             status: true,
//             message: "Prospect deleted successfully.",
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ status: false, message: error.message })
//     }
// }


import Prospect from "../models/prospect.js"
import Client from "../models/Clients.js" // Import Client model

// Create a new Prospect
export const createProspect = async (req, res) => {
  try {
    const { name, companyName, email, number, description } = req.body

    const existing = await Prospect.findOne({ email })
    if (existing) {
      return res.status(400).json({
        status: false,
        message: "Prospect already exists with this email.",
      })
    }

    const prospect = await Prospect.create({
      name,
      companyName,
      email,
      number,
      description,
    })

    res.status(201).json({
      status: true,
      message: "Prospect created successfully.",
      prospect,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, message: error.message })
  }
}

// Get all Prospects
export const getAllProspects = async (req, res) => {
  try {
    const prospects = await Prospect.find()
    res.status(200).json(prospects)
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, message: error.message })
  }
}

// Get Prospect by ID
export const getProspectById = async (req, res) => {
  try {
    const { id } = req.params
    const prospect = await Prospect.findById(id)

    if (!prospect) {
      return res.status(404).json({ status: false, message: "Prospect not found" })
    }

    res.status(200).json(prospect)
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, message: error.message })
  }
}

// Update Prospect
export const updateProspect = async (req, res) => {
  try {
    const { id } = req.params
    const prospect = await Prospect.findById(id)

    if (!prospect) {
      return res.status(404).json({ status: false, message: "Prospect not found" })
    }

    const { name, companyName, email, number, description } = req.body

    prospect.name = name || prospect.name
    prospect.companyName = companyName || prospect.companyName
    prospect.email = email || prospect.email
    prospect.number = number || prospect.number
    prospect.description = description || prospect.description

    const updated = await prospect.save()

    res.status(200).json({
      status: true,
      message: "Prospect updated successfully.",
      prospect: updated,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, message: error.message })
  }
}

// Delete Prospect
export const deleteProspect = async (req, res) => {
  try {
    const { id } = req.params
    await Prospect.findByIdAndDelete(id)

    res.status(200).json({
      status: true,
      message: "Prospect deleted successfully.",
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, message: error.message })
  }
}

// Convert Prospect to Client
export const convertProspectToClient = async (req, res) => {
  try {
    const { id } = req.params

    const prospect = await Prospect.findById(id)
    if (!prospect) {
      return res.status(404).json({
        status: false,
        message: "Prospect not found.",
      })
    }

    // Check for duplicate client using email
    const existingClient = await Client.findOne({ email: prospect.email })
    if (existingClient) {
      return res.status(400).json({
        status: false,
        message: "Client already exists with this email.",
      })
    }

    // Create new Client from Prospect
    const client = await Client.create({
      name: prospect.name,
      companyName: prospect.companyName,
      email: prospect.email,
      number: prospect.number,
      description: prospect.description,
      whatsapp: prospect.whatsapp,
      prospectId: prospect._id,
    })

    // Optionally delete the prospect after conversion
    await prospect.deleteOne()

    res.status(201).json({
      status: true,
      message: "Prospect converted to client successfully.",
      client,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, message: error.message })
  }
}
