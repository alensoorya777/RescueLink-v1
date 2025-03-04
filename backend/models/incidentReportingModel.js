const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  },
  title: {
    required: true,
    type: String,
    trim: true,
  },
  type: {
    type: String, // Added incident type
    required: true,
  },
  description: {
    required: true,
    type: String,
    trim: true,
  },
  date: {
    type: Date, // Added incident date
    required: true,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [latitude, longitude]
      required: true,
    },
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  reporterName: {
    type: String, // Added reporter's name
    required: true,
  },
  phoneNumber: {
    type: String, // Added reporter's phone number
    required: true,
  },
  verifiedStatus: {
    type: String, // Added verification status
    enum: ["Verified", "Unverified"],
    default: "Unverified",
  },
});

const incidentModel = mongoose.model("incident", incidentSchema);
module.exports = incidentModel;
