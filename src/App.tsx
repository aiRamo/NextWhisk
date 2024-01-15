import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import HomePage from './screens/HomePage';
import RecipeDashboard from './screens/RecipeDashboard';
import VisualAssistant from './screens/VisualAssistant';
import { LinkProvider } from './handlers/RecipeLink';

function App() {
  return (
    <Router>
      <LinkProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<RecipeDashboard />} />
          <Route path="/vassistant" element={<VisualAssistant />} />
        </Routes>
      </LinkProvider>
    </Router>
  );
}

export default App;
