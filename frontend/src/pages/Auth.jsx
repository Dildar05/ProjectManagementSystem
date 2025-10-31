import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import '../styles/pages/Auth.css';

const Auth = () => {
  const [isDark] = useDarkMode();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login', 'register', 'join'
  const [accountType, setAccountType] = useState('personal'); // 'personal', 'company'
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    inviteCode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Refs for animations
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const formRef = useRef(null);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2.5 + 0.8;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.color = isDark ? '160, 180, 200' : '100, 120, 150';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.vx -= (dx / distance) * force * 0.5;
          this.vy -= (dy / distance) * force * 0.5;
        }

        // Boundaries
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        p1.update();
        p1.draw();

        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(${p1.color}, ${(1 - distance / 120) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  // Handle mode change with animation
  const handleModeChange = (newMode) => {
    if (newMode === mode || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Animate out
    if (formRef.current) {
      formRef.current.classList.add('morph-out');
    }

    setTimeout(() => {
      setMode(newMode);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        company: ''
      });
      setErrors({});
      
      // Animate in
      if (formRef.current) {
        formRef.current.classList.remove('morph-out');
        formRef.current.classList.add('morph-in');
      }
      
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.classList.remove('morph-in');
        }
        setIsTransitioning(false);
      }, 500);
    }, 300);
  };

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    if (type === 'personal') {
      setFormData(prev => ({ ...prev, companyName: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }

    if (mode === 'register') {
      if (!formData.fullName) {
        newErrors.fullName = 'Имя обязательно';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Подтвердите пароль';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }

      if (accountType === 'company' && !formData.companyName) {
        newErrors.companyName = 'Название компании обязательно';
      }
    }

    if (mode === 'join') {
      if (!formData.inviteCode) {
        newErrors.inviteCode = 'Код приглашения обязателен';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', { mode, formData });
      setLoading(false);
      // Navigate to dashboard or show success
    }, 2000);
  };

  // Ripple effect on button click
  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleButtonClick = (e) => {
    createRipple(e);
    handleSubmit(e);
  };

  return (
    <div className={`auth-new-page ${isDark ? 'dark-theme' : ''}`}>
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="particles-canvas"></canvas>

      {/* Animated Waves */}
      <div className="waves-container">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="wave wave-1" fill="url(#gradient1)" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path className="wave wave-2" fill="url(#gradient2)" fillOpacity="0.2" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,181.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path className="wave wave-3" fill="url(#gradient3)" fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,181.3C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#f7931e" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7931e" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#f7931e" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="auth-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Назад</span>
        </button>

        {/* Auth Card */}
        <div className="auth-card" ref={formRef}>
          {/* Mode Switcher */}
          <div className="mode-switcher">
            <button
              className={`mode-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => handleModeChange('login')}
              disabled={isTransitioning}
            >
              <span className="mode-text">Вход</span>
            </button>
            <button
              className={`mode-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => handleModeChange('register')}
              disabled={isTransitioning}
            >
              <span className="mode-text">Регистрация</span>
            </button>
            <button
              className={`mode-btn ${mode === 'join' ? 'active' : ''}`}
              onClick={() => handleModeChange('join')}
              disabled={isTransitioning}
            >
              <span className="mode-text">Присоединиться</span>
            </button>
            <div className={`mode-indicator ${mode === 'register' ? 'center' : mode === 'join' ? 'right' : ''}`}></div>
          </div>

          {/* Account Type Selector - Register only */}
          {mode === 'register' && (
            <div className="account-type-selector">
              <div 
                className={`account-type-card ${accountType === 'personal' ? 'active' : ''}`}
                onClick={() => handleAccountTypeChange('personal')}
              >
                <div className="type-icon">👤</div>
                <h4>Личный аккаунт</h4>
                <p>Персональное пространство для ваших проектов</p>
                {accountType === 'personal' && <div className="checkmark">✓</div>}
              </div>
              <div 
                className={`account-type-card ${accountType === 'company' ? 'active' : ''}`}
                onClick={() => handleAccountTypeChange('company')}
              >
                <div className="type-icon">🏢</div>
                <h4>Компания</h4>
                <p>Рабочее пространство для команды</p>
                {accountType === 'company' && <div className="checkmark">✓</div>}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name - Register only */}
            {mode === 'register' && (
              <div className={`input-group ${focusedInput === 'fullName' || formData.fullName ? 'focused' : ''} ${errors.fullName ? 'error' : ''}`}>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('fullName')}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="fullName">
                  <span className="label-text">Полное имя</span>
                </label>
                <div className="input-line"></div>
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>
            )}

            {/* Email */}
            <div className={`input-group ${focusedInput === 'email' || formData.email ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
              />
              <label htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <div className="input-line"></div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={`input-group ${focusedInput === 'password' || formData.password ? 'focused' : ''} ${errors.password ? 'error' : ''}`}>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
              />
              <label htmlFor="password">
                <span className="label-text">Пароль</span>
              </label>
              <div className="input-line"></div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Confirm Password - Register only */}
            {mode === 'register' && (
              <div className={`input-group ${focusedInput === 'confirmPassword' || formData.confirmPassword ? 'focused' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="confirmPassword">
                  <span className="label-text">Подтвердите пароль</span>
                </label>
                <div className="input-line"></div>
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            )}

            {/* Company Name - Register Company only */}
            {mode === 'register' && accountType === 'company' && (
              <div className={`input-group ${focusedInput === 'companyName' || formData.companyName ? 'focused' : ''} ${errors.companyName ? 'error' : ''}`}>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('companyName')}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="companyName">
                  <span className="label-text">Название компании</span>
                </label>
                <div className="input-line"></div>
                {errors.companyName && <span className="error-text">{errors.companyName}</span>}
              </div>
            )}

            {/* Invite Code - Join only */}
            {mode === 'join' && (
              <div className={`input-group ${focusedInput === 'inviteCode' || formData.inviteCode ? 'focused' : ''} ${errors.inviteCode ? 'error' : ''}`}>
                <input
                  type="text"
                  name="inviteCode"
                  id="inviteCode"
                  value={formData.inviteCode}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('inviteCode')}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="inviteCode">
                  <span className="label-text">Код приглашения</span>
                </label>
                <div className="input-line"></div>
                {errors.inviteCode && <span className="error-text">{errors.inviteCode}</span>}
                {!focusedInput && !formData.inviteCode && (
                  <span className="input-placeholder">XXXX-XXXX-XXXX</span>
                )}
              </div>
            )}

            {/* Forgot Password - Login only */}
            {mode === 'login' && (
              <div className="forgot-password">
                <a href="#forgot">Забыли пароль?</a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`submit-btn ${loading ? 'loading' : ''}`}
              onClick={handleButtonClick}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Загрузка...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === 'login' ? 'Войти' : mode === 'register' ? 'Создать аккаунт' : 'Присоединиться'}
                  </span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Social Auth */}
          <div className="divider">
            <span>или</span>
          </div>

          <div className="social-auth">
            <button className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.8 10.2273C19.8 9.51818 19.7364 8.83636 19.6182 8.18182H10V12.05H15.4818C15.2273 13.3 14.4636 14.3591 13.3182 15.0682V17.5773H16.7091C18.6091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
                <path d="M10 20C12.7 20 14.9636 19.1045 16.7091 17.5773L13.3182 15.0682C12.3409 15.6682 11.0955 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.34545 11.9H0.854546V14.4909C2.59091 17.9591 6.04545 20 10 20Z" fill="#34A853"/>
                <path d="M4.34545 11.9C4.12727 11.3 4 10.6591 4 10C4 9.34091 4.12727 8.7 4.34545 8.1V5.50909H0.854546C0.309091 6.59091 0 7.75909 0 10C0 12.2409 0.309091 13.4091 0.854546 14.4909L4.34545 11.9Z" fill="#FBBC04"/>
                <path d="M10 3.97727C11.2182 3.97727 12.3091 4.38182 13.1818 5.21818L16.1727 2.22727C14.9591 1.08182 12.6955 0 10 0C6.04545 0 2.59091 2.04091 0.854546 5.50909L4.34545 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
            <button className="social-btn github">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="auth-features">
          <div className="feature-item">
            <span className="feature-text">Быстрый старт</span>
          </div>
          <div className="feature-item">
            <span className="feature-text">Безопасность данных</span>
          </div>
          <div className="feature-item">
            <span className="feature-text">Высокая производительность</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
