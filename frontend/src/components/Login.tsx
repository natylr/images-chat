import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchPublicKey, encryptPassword } from '../services/securityService';

const Login: React.FC = () => {
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');

  useEffect(() => {
    const getPublicKey = async () => {
      const key = await fetchPublicKey();
      setPublicKey(key);
    };
    getPublicKey();
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Redirect to the dashboard if the user is logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const combinedString = `${password}${identifier}`;
      const encryptedPassword = encryptPassword(combinedString, publicKey);
      await loginUser({ identifier, password: encryptedPassword });
      navigate('/dashboard');
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
          <label htmlFor="identifier">Username or Email:</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
