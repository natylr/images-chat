import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <section className="landing-background">
        <h2>Welcome to MyApp</h2>
        <p>Your solution for [describe your service/product].</p>
        <div className="landing-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
        <div className="emoji emoji1">
          <img src="/emojis/emoji_1.png" alt="emoji" />
          <img src="/emojis/emoji_2.png" alt="emoji" />
          <img src="/emojis/emoji_3.png" alt="emoji" />
          <img src="/emojis/emoji_4.png" alt="emoji" />
        </div>
        <div className="emoji emoji2">
          <img src="/emojis/emoji_5.png" alt="emoji" />
          <img src="/emojis/emoji_6.png" alt="emoji" />
          <img src="/emojis/emoji_7.png" alt="emoji" />
        </div>
      </section>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
