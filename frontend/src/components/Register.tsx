import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { checkUsernameAvailability, createUser } from '../services/userServie';
import { fetchPublicKey, encryptPassword } from '../services/securityService';

import './Auth.css';
import {
  RequiredValidator,
  MinLengthValidator,
  EmailValidator,
  MatchValidator,
  Validator,
  PasswordStrengthValidator,
} from '../utils/validators';

const validationRules: { [key: number]: { [field: string]: Validator[] } } = {
  1: {
    fname: [new RequiredValidator(), new MinLengthValidator(2)],
    lname: [new RequiredValidator(), new MinLengthValidator(2)],
  },
  2: {
    email: [new RequiredValidator(), new EmailValidator()],
    username: [new RequiredValidator(), new MinLengthValidator(4)],
    password: [new RequiredValidator(), new MinLengthValidator(8), new PasswordStrengthValidator(3)],
    confirmPassword: [new MatchValidator('password')],
  },
  3: {
    phone: [new RequiredValidator(), new MinLengthValidator(3)],
  },
};

const usernameStepIndex = 2;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const [formData, setFormData] = useState<{ [key: string]: string | number }>({
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordScore, setPasswordScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [availableStatus, setAvailableStatus] = useState<boolean | null>(null);
  const [publicKey, setPublicKey] = useState<string>('');

  useEffect(() => {
    const getPublicKey = async () => {
      const key = await fetchPublicKey();
      setPublicKey(key);
    };
    getPublicKey();
  }, []);

  const validateCurrentStep = async () => {
    Object.entries(validationRules[currentStep] || {}).forEach(([field, validators]) => {
      for (const validator of validators) {
        const error = validator.validate(formData[field] as string, { ...formData, passwordScore });
        if (error) {
          setErrors((prev) => ({ ...prev, [field]: error }));
          break;
        }
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    });

    if (currentStep === usernameStepIndex) await handleCheckUsername();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'username') setAvailableStatus(null);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    const validators = validationRules[currentStep]?.[id];
    if (validators) {
      for (const validator of validators) {
        const error = validator.validate(value, { ...formData, passwordScore });
        if (error) {
          setErrors((prev) => ({ ...prev, [id]: error }));
          return;
        }
      }
    }
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleCheckUsername = async () => {
    const validators = validationRules[usernameStepIndex]['username'];
    for (const validator of validators) {
      const error = validator.validate(formData.username as string, formData);
      if (error) {
        setErrors((prev) => ({ ...prev, username: error }));
        return;
      }
    }

    setIsChecking(true);
    setAvailableStatus(null);

    try {
      const response = await checkUsernameAvailability(formData.username as string);
      setAvailableStatus(response.available ? true : false);
    } catch (error) {
      console.error('Error checking username availability:', error);
      setAvailableStatus(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleNext = async () => {
    await validateCurrentStep();
    if (Object.values(errors).some((error) => error.trim() !== '')) return;

    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateCurrentStep();
    if (Object.values(errors).some((error) => error.trim() !== '')) return;

    try {
      const combinedString = `${formData.password as string}${formData.username as string}`;
      const encryptedPassword = encryptPassword(combinedString, publicKey);
      const response = await createUser({ ...formData, password: encryptedPassword });

      if (response.status === 201) {
        alert('Registration successful');
        navigate('/login');
      } else {
        console.log(response);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      alert(err.message);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (nextButtonRef.current) {
          nextButtonRef.current.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="auth-container register-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {Object.values(errors)
          .filter(Boolean)
          .map((error, index) => (
            <p key={index} className="auth-error">
              {error}
            </p>
          ))}
        {currentStep === 1 && (
          <>
            <div className="auth-field">
              <label htmlFor="fname">First Name:</label>
              <input type="text" id="fname" value={formData.fname} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label htmlFor="lname">Last Name:</label>
              <input type="text" id="lname" value={formData.lname} onChange={handleChange} required />
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="auth-field">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={formData.username} onChange={handleChange} required />
              <button type="button" onClick={handleCheckUsername} disabled={isChecking}>
                {isChecking ? 'Checking...' : 'Check Availability'}
              </button>
              {availableStatus === true && <span className="status-success">✅ Available</span>}
              {availableStatus === false && <span className="status-error">❌ Taken</span>}
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
              <PasswordStrengthBar password={formData.password as string} onChangeScore={setPasswordScore} />
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
              <input type="text" id="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="auth-field">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" value={formData.city} onChange={handleChange} />
            </div>
            <div className="auth-field">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" value={formData.phone} onChange={handleChange} required />
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
              ref={nextButtonRef}
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
