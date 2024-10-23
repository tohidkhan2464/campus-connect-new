const mongoose = require("mongoose");
// Mongoose intantiate

// Route Handler
const activitySchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    require: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  isSeen: {
    type: String,
    require: true,
    default: "False",
    enum: ["True", "False"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Export
module.exports = mongoose.model("Activity", activitySchema);
