// models/Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String },
    email: { type: String },
    number: { type: String },
    description: { type: String },
    whatsapp: { type: Boolean, default: false },
    prospectId: { type: mongoose.Schema.Types.ObjectId, ref: "Prospect" }, // Optional: tracks origin
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
 