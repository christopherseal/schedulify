import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const path = isLogin ? 'login' : 'signup';
      const payload = isLogin
        ? { email, password }
        : { email, password, password_confirmation: passwordConfirm };

      const res = await axios.post(`/api/v1/${path}`, payload);
      localStorage.setItem('token', res.data.token);

      setError('');
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/index');
      }, 2000);
    } catch (err) {
      setShowSuccessModal(false);
      setError(
        err.response?.data?.error ||
        err.response?.data?.errors?.join(', ') ||
        'Something went wrong'
      );
    }
  };

  return (
  <>
    {showSuccessModal && (
      <div className="success-modal">
        <div className="success-content">✅ Login Successful!</div>
      </div>
    )}

    {!showSuccessModal && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              required
            />
          )}

          <button onClick={handleAuth}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </p>
        </div>
      </div>
    )}
  </>
);
};

export default AuthModal;
