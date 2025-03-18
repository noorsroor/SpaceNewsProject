const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      role: { type: String, enum: ["Admin"], default: "Admin" },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Admin", AdminSchema);
  