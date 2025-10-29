import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import '../styles/pages/Auth.css';

const Auth = () => {
  const [isDark] = useDarkMode();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login', 'register', 'join'
  const [accountType, setAccountType] = useState('personal'); // 'personal', 'company'
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    inviteCode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    // Confirm password validation (only for registration)
    if (mode === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Подтвердите пароль';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }

      // Company name validation
      if (accountType === 'company' && !formData.companyName) {
        newErrors.companyName = 'Название компании обязательно';
      }
    }

    // Invite code validation
    if (mode === 'join' && !formData.inviteCode) {
      newErrors.inviteCode = 'Код приглашения обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'login') {
        console.log('Login:', { email: formData.email, password: formData.password });
        // navigate('/dashboard');
      } else if (mode === 'register') {
        console.log('Register:', {
          email: formData.email,
          password: formData.password,
          type: accountType,
          companyName: accountType === 'company' ? formData.companyName : null
        });
        // navigate('/onboarding');
      } else if (mode === 'join') {
        console.log('Join:', {
          email: formData.email,
          password: formData.password,
          inviteCode: formData.inviteCode
        });
        // navigate('/dashboard');
      }

      alert(`${mode === 'login' ? 'Вход' : mode === 'register' ? 'Регистрация' : 'Присоединение'} успешно!`);
    } catch (error) {
      setErrors({ submit: 'Произошла ошибка. Попробуйте снова.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-page ${isDark ? 'dark-theme' : ''}`}>
      {/* Animated Background */}
      <div className="auth-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="auth-container">
        {/* Logo and Back Button */}
        <div className="auth-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="auth-logo">
            <span className="logo-icon">🎮</span>
            <span className="logo-text">Korastra</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="auth-card glass-effect">
          {/* Mode Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Вход
            </button>
            <button
              className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => setMode('register')}
            >
              Регистрация
            </button>
            <button
              className={`auth-tab ${mode === 'join' ? 'active' : ''}`}
              onClick={() => setMode('join')}
            >
              Присоединиться
            </button>
            <div className={`tab-indicator ${mode}`}></div>
          </div>

          {/* Title */}
          <div className="auth-title">
            <h2>
              {mode === 'login' && 'Добро пожаловать!'}
              {mode === 'register' && 'Создайте аккаунт'}
              {mode === 'join' && 'Присоединитесь к команде'}
            </h2>
            <p>
              {mode === 'login' && 'Войдите в свой аккаунт для продолжения'}
              {mode === 'register' && 'Начните управлять проектами с геймификацией'}
              {mode === 'join' && 'Введите код приглашения от вашей команды'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Account Type Selection (only for registration) */}
            {mode === 'register' && (
              <div className="account-type-selector">
                <label className="form-label">Тип аккаунта</label>
                <div className="account-types">
                  <button
                    type="button"
                    className={`account-type-card ${accountType === 'personal' ? 'active' : ''}`}
                    onClick={() => setAccountType('personal')}
                  >
                    <div className="type-icon">👤</div>
                    <div className="type-info">
                      <h4>Личный аккаунт</h4>
                      <p>Для индивидуального использования</p>
                    </div>
                    <div className="type-check">
                      {accountType === 'personal' && <span>✓</span>}
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`account-type-card ${accountType === 'company' ? 'active' : ''}`}
                    onClick={() => setAccountType('company')}
                  >
                    <div className="type-icon">🏢</div>
                    <div className="type-info">
                      <h4>Для компании</h4>
                      <p>Управление командными проектами</p>
                    </div>
                    <div className="type-check">
                      {accountType === 'company' && <span>✓</span>}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Company Name (only for company registration) */}
            {mode === 'register' && accountType === 'company' && (
              <div className="form-group">
                <label htmlFor="companyName" className="form-label">
                  Название компании
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className={`form-input ${errors.companyName ? 'error' : ''}`}
                  placeholder="Введите название компании"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                {errors.companyName && (
                  <span className="error-message">{errors.companyName}</span>
                )}
              </div>
            )}

            {/* Invite Code (only for join) */}
            {mode === 'join' && (
              <div className="form-group">
                <label htmlFor="inviteCode" className="form-label">
                  Код приглашения
                </label>
                <input
                  type="text"
                  id="inviteCode"
                  name="inviteCode"
                  className={`form-input ${errors.inviteCode ? 'error' : ''}`}
                  placeholder="Введите код приглашения"
                  value={formData.inviteCode}
                  onChange={handleInputChange}
                />
                {errors.inviteCode && (
                  <span className="error-message">{errors.inviteCode}</span>
                )}
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="example@korastra.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Введите пароль"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password (only for registration) */}
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Подтвердите пароль
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {/* Forgot Password (only for login) */}
            {mode === 'login' && (
              <div className="form-actions">
                <button type="button" className="forgot-password">
                  Забыли пароль?
                </button>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="submit-error">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Загрузка...
                </>
              ) : (
                <>
                  {mode === 'login' && 'Войти'}
                  {mode === 'register' && 'Создать аккаунт'}
                  {mode === 'join' && 'Присоединиться'}
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="auth-footer">
            {mode === 'login' ? (
              <p>
                Нет аккаунта?{' '}
                <button onClick={() => setMode('register')} className="link-button">
                  Зарегистрироваться
                </button>
              </p>
            ) : (
              <p>
                Уже есть аккаунт?{' '}
                <button onClick={() => setMode('login')} className="link-button">
                  Войти
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="auth-features">
          <div className="feature-item">
            <span className="feature-icon">✨</span>
            <span>Геймификация задач</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>Аналитика в реальном времени</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <span>Командная работа</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
