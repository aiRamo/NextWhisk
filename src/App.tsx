import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import HomePage from './screens/HomePage';
import RecipeDashboard from './screens/RecipeDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<RecipeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
