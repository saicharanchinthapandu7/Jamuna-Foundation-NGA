import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TakeQuiz({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`http://localhost:5000/api/quizzes`);
      const foundQuiz = res.data.find(q => q._id === id);
      if (foundQuiz) setQuiz(foundQuiz);
    };
    fetchQuiz();
  }, [id]);

  if (!quiz) return <p>Loading quiz...</p>;

  const question = quiz.questions[currentIndex];

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const nextQuestion = () => {
    if (currentIndex < quiz.questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const submitQuiz = () => {
    let calculatedScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionIndex) calculatedScore++;
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="results-container">
        <h2>Quiz Results</h2>
        <p>Your score: {score} / {quiz.questions.length}</p>
        <button className="submit-quiz-btn" onClick={() => navigate('/quizzes')}>Back to Quizzes</button>
      </div>
    );
  }

  return (
    <div className="take-quiz-container">
      <h3>{quiz.title}</h3>
      <div className="question-count">
        Question {currentIndex + 1} of {quiz.questions.length}
      </div>
      <div className="question-text">{question.questionText}</div>
      <div className="options-list">
        {question.options.map((option, i) => (
          <div
            key={i}
            className={`option-item${answers[currentIndex] === i ? " selected" : ""}`}
            onClick={() => handleAnswer(i)}
          >
            <input
              type="radio"
              name={`question_${currentIndex}`}
              checked={answers[currentIndex] === i}
              onChange={() => handleAnswer(i)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <div className="nav-buttons">
        <button onClick={prevQuestion} disabled={currentIndex === 0}>Previous</button>
        {currentIndex < quiz.questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            disabled={answers[currentIndex] === undefined}
          >
            Next
          </button>
        ) : (
          <button
            className="submit-quiz-btn"
            onClick={submitQuiz}
            disabled={answers[currentIndex] === undefined}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default TakeQuiz;
