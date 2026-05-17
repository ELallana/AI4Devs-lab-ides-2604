import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>LTI - Talent Tracking System</h1>
        <button onClick={() => navigate('/candidate-add')}>
          Add a new candidate
        </button>
      </header>
    </div>
  );
}

export default MainPage;
