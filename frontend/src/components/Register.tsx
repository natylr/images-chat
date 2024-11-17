import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    phone: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isMinimalLen = (value: string, exceptedLen: number): boolean => {
    console.log(value, exceptedLen)
    if (exceptedLen <= value.length)
      return true;
    return false;
  }
  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !(isMinimalLen(formData.fname, 2) && isMinimalLen(formData.lname, 2));
    }
    if (currentStep === 2) {
      return !(isMinimalLen(formData.email, 3) && isMinimalLen(formData.password, 8) && isMinimalLen(formData.confirmPassword, 8));
    }
    if (currentStep === 3) {
      return !(isMinimalLen(formData.phone, 3)); // Address and city are optional based on your form
    }
    return false;
  };

  const handleNext = () => {
    if (currentStep === 2 && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setError('');
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Registering with:', formData);
      navigate('/login');
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="auth-error">{error}</p>}

        {currentStep === 1 && (
          <>
            <div className="auth-field">
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="auth-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="auth-field">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="auth-buttons">
          {currentStep > 1 && (
            <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          )}
        </div>
        {currentStep === 1 && (
          <p>
            Already have an account? <Link to="/login">Login here.</Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
