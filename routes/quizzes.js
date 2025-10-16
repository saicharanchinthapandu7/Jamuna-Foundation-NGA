const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

// GET all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Failed to fetch quizzes', error: error.message });
  }
});

module.exports = router;
