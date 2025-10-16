import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 },
  ]);
  const [message, setMessage] = useState('');

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    if (field === 'questionText') {
      updated[idx].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIdx = parseInt(field.at(-1));
      updated[idx].options[optionIdx] = value;
    } else if (field === 'correctOptionIndex') {
      updated[idx].correctOptionIndex = parseInt(value);
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quizzes', { title, description, questions }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Quiz created successfully!');
      setTitle('');
      setDescription('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }]);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating quiz');
    }
  };

  return (
    <div className="quiz-create-form">
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label className="quiz-label">Quiz Title
          <input
            className="quiz-input"
            type="text"
            placeholder="Enter quiz title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required />
        </label>
        <label className="quiz-label">Description
          <textarea
            className="quiz-textarea"
            placeholder="(Optional) Enter a description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
          />
        </label>
        <h3>Questions</h3>
        {questions.map((q, idx) => (
          <div className="quiz-question-card" key={idx}>
            <div className="quiz-q-header">
              <span>Question {idx + 1}</span>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeQuestion(idx)}
                disabled={questions.length === 1}
                title="Remove this question"
              >✖</button>
            </div>
            <input
              type="text"
              placeholder="Question text..."
              value={q.questionText}
              onChange={e => handleQuestionChange(idx, 'questionText', e.target.value)}
              required
              className="quiz-input"
            />
            <div className="quiz-options-area">
              {q.options.map((opt, i) => (
                <label key={i} className="quiz-option-label">
                  <input
                    type="radio"
                    name={`correct-${idx}`}
                    checked={q.correctOptionIndex === i}
                    onChange={() => handleQuestionChange(idx, 'correctOptionIndex', i)}
                    className="radio-input"
                  />
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={e => handleQuestionChange(idx, `option${i}`, e.target.value)}
                    required
                    className="quiz-input quiz-opt-input"
                  />
                  {q.correctOptionIndex === i && <span className="correct-ans-tag">✔ Correct</span>}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addQuestion}>+ Add Question</button>
        <br />
        <button type="submit" className="submit-btn">Save Quiz</button>
      </form>
      {message && <div className="quiz-msg">{message}</div>}
    </div>
  );
}

export default CreateQuiz;
