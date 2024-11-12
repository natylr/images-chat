import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const emojis1 = ['/emojis/emoji_1.png', '/emojis/emoji_2.png', '/emojis/emoji_3.png', '/emojis/emoji_4.png'];
  const emojis2 = ['/emojis/emoji_5.png', '/emojis/emoji_6.png', '/emojis/emoji_7.png'];

  return (
    <div className="landing-container">
      <section className="landing-background">
        <h2>Welcome to the Images Chat</h2>
        <p>Here, you can communicate using only images!</p>
        <div className="landing-buttons">
        <Link to="/login" className="btn btn-primary" aria-label="Login Page">Login</Link>
        <Link to="/register" className="btn btn-secondary" aria-label="Register Page">Register</Link>
        </div>
           <div className="emoji emoji1">
          {emojis1.map((src, index) => (
            <img key={index} src={src} alt={`emoji ${index + 1}`} />
          ))}
        </div>
        <div className="emoji emoji2">
          {emojis2.map((src, index) => (
            <img key={index} src={src} alt={`emoji ${index + 5}`} />
          ))}
        </div>
      </section>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Images Chat. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
