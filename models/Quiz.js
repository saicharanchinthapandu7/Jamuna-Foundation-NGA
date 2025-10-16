const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [
    {
      questionText: String,
      options: [String],
      correctOptionIndex: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
