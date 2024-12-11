import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';
import RedirectIfAuthenticated from './guards/RedirectIfAuthenticated';
import AuthenticatedRoute from './guards/AuthenticatedRoute ';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <LoginPage />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuthenticated>
                  <RegisterPage />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthenticatedRoute>
                  <LandingPage />
                </AuthenticatedRoute>
              }
            />
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
