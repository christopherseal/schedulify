import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import IndexPage from './pages/IndexPage';
import PendingTradesPage from './pages/PendingTradesPage'; // Will build later

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '220px', padding: '2rem', flex: 1 }}>
          <Routes>
            <Route path="/index" element={<IndexPage />} />
             <Route path="/" element={<AuthModal />} />
            <Route path="/trades" element={<PendingTradesPage />} />
            {/* Add other pages here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
