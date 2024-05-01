import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
