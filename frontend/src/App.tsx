// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
        </AuthProvider>

          {/* Wave background effect */}
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        );
};

        export default App;
