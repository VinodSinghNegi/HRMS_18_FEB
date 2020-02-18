const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: Number,
    req: true,
    ref:"User"
  },
  reportingManagerId: {
    type: Number,
    ref: "User",
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  leaveData:{
    
      type: mongoose.Schema.Types.ObjectId,
      ref: "leaveType"
    
  },
  reason: {
    type: String
  },
  Status: {
    type: String,
    default: "Not Approved"
  }
});

module.exports = leave = mongoose.model("leave", leaveSchema);
