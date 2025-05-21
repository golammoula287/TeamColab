import mongoose from "mongoose";

const prospectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String },
    email: { type: String },
    number: { type: String },
    description: { type: String },
    whatsapp: { type: Boolean, default: false }, // true = Yes, false = No
  },
  { timestamps: true }
);

const Prospect = mongoose.model("Prospect", prospectSchema);
export default Prospect;

