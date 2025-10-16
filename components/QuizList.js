import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get('http://localhost:5000/api/quizzes');
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.length === 0 && <p>No quizzes available.</p>}
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <Link to={`/take-quiz/${quiz._id}`}>
              <button>Take Quiz</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
