const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: { type: String, default: null },
  time: { type: Date},
  user_id: { type: 'ObjectId', ref: 'users' }
});

module.exports = mongoose.model("todo", todoSchema);