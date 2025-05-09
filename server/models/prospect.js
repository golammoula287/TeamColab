import mongoose from "mongoose"

const prospectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        companyName: { type: String, required: true },
        email: { type: String, required: true },
        number: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
)

const Prospect = mongoose.model("Prospect", prospectSchema)
export default Prospect
