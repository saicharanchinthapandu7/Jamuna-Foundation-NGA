import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Educational Quiz Platform</h1>
      <p>Learn about anti-drug and environmental topics by taking fun quizzes.</p>
      <Link to="/quizzes">
        <button>Take a Quiz</button>
      </Link>
    </div>
  );
}

export default HomePage;
