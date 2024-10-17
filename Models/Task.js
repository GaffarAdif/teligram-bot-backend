const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Task'],  // Ensures only 'Task' is allowed as the type
      required: true
    },
    name: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true,
      },
    points: {
      type: Number,
      required: true,
      min: 1 // Ensures points are positive
    },
    keyword: {
      type: String,
      required: true
    }
  });
  
  const Task = mongoose.model('Task', taskSchema);
  