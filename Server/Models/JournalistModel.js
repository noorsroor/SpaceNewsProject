// Models/JournalistModel.js
const mongoose = require("mongoose");

const JournalistSchema = new mongoose.Schema(
  {
    // Reference to a User document
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    portfolio: { type: String, required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journalists", JournalistSchema);
