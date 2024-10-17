// Example Task model (e.g., Task.js)
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  instructions: { type: String, required: true },
  link: { type: String, required: true },
  points: { type: Number, required: true },
  keyword: { type: String, required: true },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
