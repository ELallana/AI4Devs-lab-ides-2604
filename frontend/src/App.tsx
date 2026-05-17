import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import CandidateAddPage from './CandidateAddPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/candidate-add" element={<CandidateAddPage />} />
    </Routes>
  );
}

export default App;
