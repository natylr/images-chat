import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import './Auth.css';
import { checkUsernameAvailability, registerUser } from '../services/userServie'

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    phone: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);
  const [availableStatus, setAvailableStatus] = useState<number>(0);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckUsername = async () => {
    if (!formData.username) return;
    if (!isMinimalLen(formData.username, 4)) {
      setAvailableStatus(1);
      return
    }
    setIsChecking(true); // Show loader
    setAvailableStatus(0);

    try {
      const response = await checkUsernameAvailability(formData.username);
      setAvailableStatus(response.available ? 2 : 3)
    } catch (error) {
      console.error('Error checking username availability:', error);
      setAvailableStatus(3);
    } finally {
      setIsChecking(false); // Hide loader
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));

    // Handle specific field validations
    if (id === 'email' && value && !isValidEmail(value)) {
      setError('Invalid email address.');
      return;
    }

    if (id === 'username') {
      setAvailableStatus(0);
    }

    if ((id === 'password' || id === 'confirmPassword') && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear error only if there is no validation issue
    setError('');
  };


  const isMinimalLen = (value: string, expectedLen: number): boolean => {
    return value.length >= expectedLen;
  };

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !(isMinimalLen(formData.fname, 2) && isMinimalLen(formData.lname, 2));
    }
    if (currentStep === 2) {
      return !(isValidEmail(formData.email) && availableStatus === 3 && 3 < passwordScore && formData.password === formData.confirmPassword);
    }
    if (currentStep === 3) {
      return !(isMinimalLen(formData.phone, 3)); // Address and city are optional based on your form
    }
    return false;
  };

  const handleNext = () => {

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
      console.log(formData);
      const response = await registerUser(formData);
      console.log(response);
      navigate('/login');
    } catch (err: any) {
      console.log(err)
      setError(err.message);
    }
  };

  return (
    <div className="auth-container register-container">
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
              <label htmlFor="username">Choose a Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={handleCheckUsername} disabled={isChecking}>
                {isChecking ? 'Checking...' : 'Check Availability'}
              </button>
              {availableStatus === 1 && <span style={{ color: 'red' }}>❌ Too Sort</span>}
              {availableStatus === 2 && <span style={{ color: 'green' }}>✅ Available</span>}
              {availableStatus === 3 && <span style={{ color: 'red' }}>❌ Taken</span>}
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
              <PasswordStrengthBar password={formData.password} onChangeScore={setPasswordScore} />
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
