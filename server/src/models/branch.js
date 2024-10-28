import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: { type: String },
  DeliveryPartners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner", //name should be same as export in DelivereyPartner
    },
  ],
});

export const Branch = mongoose.model("Branch", branchSchema);
