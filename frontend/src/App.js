import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthModal from './components/AuthModal';
import IndexPage from './pages/IndexPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthModal />} />
        <Route path="/index" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}

export default App;
