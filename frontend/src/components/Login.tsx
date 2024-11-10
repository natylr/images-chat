import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'; // Shared styles for authentication pages

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend API
    try {
      // Example API call
      // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // const data = await response.json();
      // if (data.success) navigate('/dashboard');
      // else setError(data.message);

      // Mock success
      console.log('Logging in with:', { email, password });
      navigate('/dashboard'); // Ensure you have a dashboard route
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
