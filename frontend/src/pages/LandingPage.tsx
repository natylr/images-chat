import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Create and style this CSS file as needed

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to MyApp</h1>
        <p>Your solution for [describe your service/product].</p>
        <div className="landing-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </header>
      <section className="landing-features">
        {/* Add feature sections or images here */}
      </section>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
