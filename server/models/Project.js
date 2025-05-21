// models/Project.js
import mongoose from "mongoose"

const costSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    invoiceId: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    costs: [costSchema],
    latestUpdate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual field for profit
projectSchema.virtual("profit").get(function () {
  const totalCost = this.costs.reduce((acc, curr) => acc + curr.amount, 0)
  return this.rate - totalCost
})

// Middleware to update `latestUpdate` on save
projectSchema.pre("save", function (next) {
  this.latestUpdate = new Date()
  next()
})

const Project = mongoose.model("Project", projectSchema)

export default Project
