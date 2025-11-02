import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import '../styles/pages/Auth.css';

const Auth = () => {
  const [isDark] = useDarkMode();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get initial mode from URL or default to 'login'
  const initialMode = searchParams.get('mode') || 'login';
  const [mode, setMode] = useState(initialMode); // 'login', 'register'
  const [accountType, setAccountType] = useState('personal'); // 'personal', 'company'
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Multi-step registration
  const [currentStep, setCurrentStep] = useState(1);
  const [stepDirection, setStepDirection] = useState('forward'); // 'forward' or 'backward'
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    nickname: '',
    companyName: '',
    country: '',
    inviteCode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Custom dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  
  // Refs for animations
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const formRef = useRef(null);

  // Countries list
  const countries = [
    { code: 'KZ', name: 'Казахстан', flag: '🇰🇿' },
    { code: 'RU', name: 'Россия', flag: '🇷🇺' },
    { code: 'US', name: 'США', flag: '🇺🇸' },
    { code: 'GB', name: 'Великобритания', flag: '🇬🇧' },
    { code: 'DE', name: 'Германия', flag: '🇩🇪' },
    { code: 'FR', name: 'Франция', flag: '🇫🇷' },
    { code: 'CN', name: 'Китай', flag: '🇨🇳' },
    { code: 'JP', name: 'Япония', flag: '🇯🇵' },
    { code: 'KR', name: 'Южная Корея', flag: '🇰🇷' },
    { code: 'IT', name: 'Италия', flag: '🇮🇹' },
    { code: 'ES', name: 'Испания', flag: '🇪🇸' },
    { code: 'CA', name: 'Канада', flag: '🇨🇦' },
    { code: 'AU', name: 'Австралия', flag: '🇦🇺' },
    { code: 'BR', name: 'Бразилия', flag: '🇧🇷' },
    { code: 'IN', name: 'Индия', flag: '🇮🇳' },
    { code: 'MX', name: 'Мексика', flag: '🇲🇽' },
    { code: 'AR', name: 'Аргентина', flag: '🇦🇷' },
    { code: 'SA', name: 'Саудовская Аравия', flag: '🇸🇦' },
    { code: 'AE', name: 'ОАЭ', flag: '🇦🇪' },
    { code: 'TR', name: 'Турция', flag: '🇹🇷' },
    { code: 'PL', name: 'Польша', flag: '🇵🇱' },
    { code: 'UA', name: 'Украина', flag: '🇺🇦' },
    { code: 'BY', name: 'Беларусь', flag: '🇧🇾' },
    { code: 'UZ', name: 'Узбекистан', flag: '🇺🇿' },
    { code: 'KG', name: 'Кыргызстан', flag: '🇰🇬' },
    { code: 'TJ', name: 'Таджикистан', flag: '🇹🇯' },
    { code: 'AM', name: 'Армения', flag: '🇦🇲' },
    { code: 'AZ', name: 'Азербайджан', flag: '🇦🇿' },
    { code: 'GE', name: 'Грузия', flag: '🇬🇪' },
    { code: 'SE', name: 'Швеция', flag: '🇸🇪' },
    { code: 'NO', name: 'Норвегия', flag: '🇳🇴' },
    { code: 'FI', name: 'Финляндия', flag: '🇫🇮' },
    { code: 'DK', name: 'Дания', flag: '🇩🇰' },
    { code: 'NL', name: 'Нидерланды', flag: '🇳🇱' },
    { code: 'BE', name: 'Бельгия', flag: '🇧🇪' },
    { code: 'CH', name: 'Швейцария', flag: '🇨🇭' },
    { code: 'AT', name: 'Австрия', flag: '🇦🇹' },
    { code: 'PT', name: 'Португалия', flag: '🇵🇹' },
    { code: 'GR', name: 'Греция', flag: '🇬🇷' },
    { code: 'CZ', name: 'Чехия', flag: '🇨🇿' },
    { code: 'RO', name: 'Румыния', flag: '🇷🇴' },
    { code: 'HU', name: 'Венгрия', flag: '🇭🇺' },
    { code: 'BG', name: 'Болгария', flag: '🇧🇬' },
    { code: 'RS', name: 'Сербия', flag: '🇷🇸' },
    { code: 'HR', name: 'Хорватия', flag: '🇭🇷' },
    { code: 'SK', name: 'Словакия', flag: '🇸🇰' },
    { code: 'SI', name: 'Словения', flag: '🇸🇮' },
    { code: 'EE', name: 'Эстония', flag: '🇪🇪' },
    { code: 'LV', name: 'Латвия', flag: '🇱🇻' },
    { code: 'LT', name: 'Литва', flag: '🇱🇹' },
    { code: 'IL', name: 'Израиль', flag: '🇮🇱' },
    { code: 'EG', name: 'Египет', flag: '🇪🇬' },
    { code: 'ZA', name: 'ЮАР', flag: '🇿🇦' },
    { code: 'NG', name: 'Нигерия', flag: '🇳🇬' },
    { code: 'KE', name: 'Кения', flag: '🇰🇪' },
    { code: 'TH', name: 'Таиланд', flag: '🇹🇭' },
    { code: 'VN', name: 'Вьетнам', flag: '🇻🇳' },
    { code: 'ID', name: 'Индонезия', flag: '🇮🇩' },
    { code: 'MY', name: 'Малайзия', flag: '🇲🇾' },
    { code: 'SG', name: 'Сингапур', flag: '🇸🇬' },
    { code: 'PH', name: 'Филиппины', flag: '🇵🇭' },
    { code: 'BD', name: 'Бангладеш', flag: '🇧🇩' },
    { code: 'PK', name: 'Пакистан', flag: '🇵🇰' },
    { code: 'IR', name: 'Иран', flag: '🇮🇷' },
    { code: 'IQ', name: 'Ирак', flag: '🇮🇶' },
    { code: 'NZ', name: 'Новая Зеландия', flag: '🇳🇿' },
    { code: 'CL', name: 'Чили', flag: '🇨🇱' },
    { code: 'CO', name: 'Колумбия', flag: '🇨🇴' },
    { code: 'PE', name: 'Перу', flag: '🇵🇪' },
    { code: 'VE', name: 'Венесуэла', flag: '🇻🇪' },
    { code: 'OTHER', name: 'Другая', flag: '🌍' }
  ];

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected country display
  const getSelectedCountry = () => {
    const country = countries.find(c => c.code === formData.country);
    return country ? `${country.flag} ${country.name}` : '';
  };

  // Handle country selection
  const handleCountrySelect = (countryCode) => {
    setFormData(prev => ({ ...prev, country: countryCode }));
    setIsDropdownOpen(false);
    setSearchTerm('');
    setErrors(prev => ({ ...prev, country: '' }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    
    // Update URL
    navigate(`/auth?mode=${newMode}`, { replace: true });
    
    // Animate out
    if (formRef.current) {
      formRef.current.classList.add('morph-out');
    }

    setTimeout(() => {
      setMode(newMode);
      setCurrentStep(1); // Reset step
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        nickname: '',
        companyName: '',
        country: '',
        inviteCode: ''
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

  // Multi-step navigation
  const goToNextStep = () => {
    if (!validateCurrentStep()) return;
    
    setStepDirection('forward');
    setCurrentStep(prev => prev + 1);
  };

  const goToPrevStep = () => {
    setStepDirection('backward');
    setCurrentStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    if (mode === 'register') {
      // Step 1: Account Type (always valid, just selection)
      if (currentStep === 1) {
        return true;
      }

      // Step 2: Company Name (if company selected)
      if (currentStep === 2 && accountType === 'company') {
        if (!formData.companyName || formData.companyName.trim().length < 2) {
          newErrors.companyName = 'Введите название компании (минимум 2 символа)';
        }
      }

      // Step 3 (or 2 for personal): First Name and Last Name
      if ((accountType === 'company' && currentStep === 3) || (accountType === 'personal' && currentStep === 2)) {
        if (!formData.firstName || formData.firstName.trim().length < 2) {
          newErrors.firstName = 'Введите имя (минимум 2 символа)';
        }
        if (!formData.lastName || formData.lastName.trim().length < 2) {
          newErrors.lastName = 'Введите фамилию (минимум 2 символа)';
        }
      }

      // Step 4 (or 3 for personal): Nickname
      if ((accountType === 'company' && currentStep === 4) || (accountType === 'personal' && currentStep === 3)) {
        if (!formData.nickname || formData.nickname.trim().length < 3) {
          newErrors.nickname = 'Никнейм должен быть минимум 3 символа';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.nickname)) {
          newErrors.nickname = 'Только буквы, цифры и подчеркивание';
        }
      }

      // Step 5 (or 4 for personal): Email
      if ((accountType === 'company' && currentStep === 5) || (accountType === 'personal' && currentStep === 4)) {
        if (!formData.email) {
          newErrors.email = 'Email обязателен';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Некорректный email';
        }
      }

      // Step 6 (or 5 for personal): Country
      if ((accountType === 'company' && currentStep === 6) || (accountType === 'personal' && currentStep === 5)) {
        if (!formData.country) {
          newErrors.country = 'Выберите страну';
        }
      }

      // Step 7 (or 6 for personal): Password
      if ((accountType === 'company' && currentStep === 7) || (accountType === 'personal' && currentStep === 6)) {
        if (!formData.password) {
          newErrors.password = 'Пароль обязателен';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Минимум 8 символов';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          newErrors.password = 'Нужны заглавные, строчные буквы и цифры';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getTotalSteps = () => {
    if (mode !== 'register') return 1;
    return accountType === 'company' ? 7 : 6;
  };

  const getStepContent = () => {
    if (mode === 'login') {
      return 'login-form';
    }

    if (mode === 'login-email') {
      return 'login-email-form';
    }

    // Multi-step registration
    if (mode === 'register') {
      if (currentStep === 1) return 'account-type';
      if (accountType === 'company') {
        if (currentStep === 2) return 'company-name';
        if (currentStep === 3) return 'full-name';
        if (currentStep === 4) return 'nickname';
        if (currentStep === 5) return 'email';
        if (currentStep === 6) return 'country';
        if (currentStep === 7) return 'password';
      } else {
        if (currentStep === 2) return 'full-name';
        if (currentStep === 3) return 'nickname';
        if (currentStep === 4) return 'email';
        if (currentStep === 5) return 'country';
        if (currentStep === 6) return 'password';
      }
    }

    return 'login-form';
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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Минимум 8 символов';
    }

    if (mode === 'join' && !formData.inviteCode) {
      newErrors.inviteCode = 'Код приглашения обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (mode === 'register') {
      // Multi-step: go to next step instead of submit
      if (currentStep < getTotalSteps()) {
        goToNextStep();
        return;
      }
    }

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', { mode, accountType, formData });
      setLoading(false);
      // Navigate to dashboard or show success
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && mode === 'register') {
      e.preventDefault();
      if (currentStep < getTotalSteps()) {
        goToNextStep();
      } else {
        handleSubmit(e);
      }
    }
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

        {/* Split Layout */}
        <div className="auth-split-container">
          {/* Left Side - Auth Form */}
          <div className="auth-left">
            {/* Auth Card */}
            <div className="auth-card" ref={formRef}>
          
          {/* Account Type Selector - Register only */}
          {mode === 'register' && currentStep === 1 && (
            <div className="account-type-selector">
              <h3 className="step-title">Выберите тип аккаунта</h3>
              <p>Начните работу с подходящим типом аккаунта для ваших целей</p>
              <div className="account-types">
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

              {/* Continue button for account type selection */}
              <button
                type="button"
                className="submit-btn"
                onClick={goToNextStep}
                disabled={!accountType}
                style={{ marginTop: '25px', width: '100%' }}
              >
                <span>Продолжить</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          )}

          {/* Progress Bar - Register only */}
          {mode === 'register' && currentStep > 1 && (
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentStep - 1) / (getTotalSteps() - 1)) * 100}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Шаг {currentStep} из {getTotalSteps()}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form" onKeyPress={handleKeyPress}>
            {/* Only show form steps after account type selection */}
            {(mode !== 'register' || currentStep > 1) && (
              <div className={`form-step ${stepDirection === 'forward' ? 'slide-left' : 'slide-right'}`}>
              
              {/* Login Form */}
              {getStepContent() === 'login-form' && (
                <>
                  <h3 className="step-title">Войдите в свою учетную запись</h3>
                  
                  {/* OAuth Buttons First */}
                  <div className="auth-methods">
                    <button type="button" className="social-btn google" onClick={() => console.log('Google login')}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M19.8 10.2273C19.8 9.51818 19.7364 8.83636 19.6182 8.18182H10V12.05H15.4818C15.2273 13.3 14.4636 14.3591 13.3182 15.0682V17.5773H16.7091C18.6091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
                        <path d="M10 20C12.7 20 14.9636 19.1045 16.7091 17.5773L13.3182 15.0682C12.3409 15.6682 11.0955 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.34545 11.9H0.854546V14.4909C2.59091 17.9591 6.04545 20 10 20Z" fill="#34A853"/>
                        <path d="M4.34545 11.9C4.12727 11.3 4 10.6591 4 10C4 9.34091 4.12727 8.7 4.34545 8.1V5.50909H0.854546C0.309091 6.59091 0 7.75909 0 10C0 12.2409 0.309091 13.4091 0.854546 14.4909L4.34545 11.9Z" fill="#FBBC04"/>
                        <path d="M10 3.97727C11.2182 3.97727 12.3091 4.38182 13.1818 5.21818L16.1727 2.22727C14.9591 1.08182 12.6955 0 10 0C6.04545 0 2.59091 2.04091 0.854546 5.50909L4.34545 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z" fill="#EA4335"/>
                      </svg>
                      <span>Войти с помощью Google</span>
                    </button>
                    
                    <button type="button" className="social-btn github" onClick={() => console.log('GitHub login')}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                      </svg>
                      <span>Войти с помощью GitHub</span>
                    </button>

                    <div className="divider">
                      <span>или</span>
                    </div>

                    <button type="button" className="email-btn" onClick={() => setMode('login-email')}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="16" height="12" rx="2"/>
                        <path d="M2 6l8 5 8-5"/>
                      </svg>
                      <span>Войти с помощью электронной почты</span>
                    </button>
                  </div>

                  <div className="auth-footer">
                    <p>У вас нет аккаунта? <button type="button" className="link-btn" onClick={() => handleModeChange('register')}>Зарегистрируйтесь</button></p>
                  </div>
                </>
              )}

              {/* Login with Email Form */}
              {getStepContent() === 'login-email-form' && (
                <>
                  <button type="button" className="back-to-options" onClick={() => setMode('login')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 10H5M5 10L10 15M5 10L10 5"/>
                    </svg>
                    Назад к вариантам входа
                  </button>

                  <h3 className="step-title">Войти с email</h3>
                  
                  {/* Email or Username */}
                  <div className={`input-group ${focusedInput === 'email' || formData.email ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                    />
                    <label htmlFor="email">
                      <span className="label-text">Email или имя пользователя</span>
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

                  <div className="forgot-password">
                    <a href="#forgot">Забыли пароль?</a>
                  </div>
                </>
              )}

              {/* Step: Company Name */}
              {getStepContent() === 'company-name' && (
                <>
                  <h3 className="step-title">Название компании</h3>
                  <p className="step-description">Как называется ваша компания?</p>
                  
                  <div className={`input-group ${focusedInput === 'companyName' || formData.companyName ? 'focused' : ''} ${errors.companyName ? 'error' : ''}`}>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('companyName')}
                      onBlur={handleBlur}
                      autoFocus
                      required
                    />
                    <label htmlFor="companyName">
                      <span className="label-text">Название компании</span>
                    </label>
                    <div className="input-line"></div>
                    {errors.companyName && <span className="error-text">{errors.companyName}</span>}
                  </div>
                </>
              )}

              {/* Step: Full Name */}
              {getStepContent() === 'full-name' && (
                <>
                  <h3 className="step-title">Как вас зовут?</h3>
                  <p className="step-description">Введите ваше имя и фамилию</p>
                  
                  <div className={`input-group ${focusedInput === 'firstName' || formData.firstName ? 'focused' : ''} ${errors.firstName ? 'error' : ''}`}>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('firstName')}
                      onBlur={handleBlur}
                      autoFocus
                      required
                    />
                    <label htmlFor="firstName">
                      <span className="label-text">Имя</span>
                    </label>
                    <div className="input-line"></div>
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>

                  <div className={`input-group ${focusedInput === 'lastName' || formData.lastName ? 'focused' : ''} ${errors.lastName ? 'error' : ''}`}>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('lastName')}
                      onBlur={handleBlur}
                      required
                    />
                    <label htmlFor="lastName">
                      <span className="label-text">Фамилия</span>
                    </label>
                    <div className="input-line"></div>
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                </>
              )}

              {/* Step: Nickname */}
              {getStepContent() === 'nickname' && (
                <>
                  <h3 className="step-title">Выберите никнейм</h3>
                  <p className="step-description">Ваш уникальный идентификатор в системе</p>
                  
                  <div className={`input-group ${focusedInput === 'nickname' || formData.nickname ? 'focused' : ''} ${errors.nickname ? 'error' : ''}`}>
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      value={formData.nickname}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('nickname')}
                      onBlur={handleBlur}
                      autoFocus
                      required
                    />
                    <label htmlFor="nickname">
                      <span className="label-text">Никнейм</span>
                    </label>
                    <div className="input-line"></div>
                    {errors.nickname && <span className="error-text">{errors.nickname}</span>}
                    {!errors.nickname && formData.nickname && (
                      <span className="helper-text">✓ Никнейм доступен</span>
                    )}
                  </div>
                </>
              )}

              {/* Step: Email */}
              {getStepContent() === 'email' && (
                <>
                  <h3 className="step-title">Ваш email</h3>
                  <p className="step-description">Мы отправим письмо для подтверждения</p>
                  
                  <div className={`input-group ${focusedInput === 'email' || formData.email ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      autoFocus
                      required
                    />
                    <label htmlFor="email">
                      <span className="label-text">Email</span>
                    </label>
                    <div className="input-line"></div>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </>
              )}

              {/* Step: Country */}
              {getStepContent() === 'country' && (
                <>
                  <h3 className="step-title">Выберите страну</h3>
                  <p className="step-description">Это поможет настроить локализацию</p>
                  
                  <div className={`input-group custom-dropdown-group ${isDropdownOpen ? 'open' : ''} ${errors.country ? 'error' : ''}`} ref={dropdownRef}>
                    <label className="input-label">Страна</label>
                    
                    <div 
                      className={`custom-dropdown-trigger ${formData.country ? 'has-value' : ''}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {formData.country ? (
                        <span className="selected-value">{getSelectedCountry()}</span>
                      ) : (
                        <span className="placeholder">Выберите страну</span>
                      )}
                      <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    {isDropdownOpen && (
                      <div className="custom-dropdown-menu">
                        <div className="dropdown-search">
                          <input
                            type="text"
                            placeholder="Поиск страны..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="dropdown-search-input"
                            autoFocus
                          />
                        </div>
                        <div className="dropdown-options">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div
                                key={country.code}
                                className={`dropdown-option ${formData.country === country.code ? 'selected' : ''}`}
                                onClick={() => handleCountrySelect(country.code)}
                              >
                                <span className="country-flag">{country.flag}</span>
                                <span className="country-name">{country.name}</span>
                              </div>
                            ))
                          ) : (
                            <div className="dropdown-no-results">Страна не найдена</div>
                          )}
                        </div>
                      </div>
                    )}

                    {errors.country && <span className="error-text">{errors.country}</span>}
                  </div>
                </>
              )}

              {/* Step: Password */}
              {getStepContent() === 'password' && (
                <>
                  <h3 className="step-title">Создайте пароль</h3>
                  <p className="step-description">Используйте минимум 8 символов</p>
                  
                  <div className={`input-group ${focusedInput === 'password' || formData.password ? 'focused' : ''} ${errors.password ? 'error' : ''}`}>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('password')}
                      onBlur={handleBlur}
                      autoFocus
                      required
                    />
                    <label htmlFor="password">
                      <span className="label-text">Пароль</span>
                    </label>
                    <div className="input-line"></div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                    {!errors.password && formData.password && formData.password.length >= 8 && (
                      <div className="password-strength">
                        <div className="strength-bar">
                          <div 
                            className="strength-fill" 
                            style={{ 
                              width: `${Math.min((formData.password.length / 12) * 100, 100)}%`,
                              backgroundColor: formData.password.length < 10 ? '#f7931e' : '#10b981'
                            }}
                          ></div>
                        </div>
                        <span className="strength-text">
                          {formData.password.length < 10 ? 'Средний' : 'Сильный'}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            )}

            {/* Navigation Buttons */}
            {(mode !== 'register' || currentStep > 1) && (
            <div className="form-navigation">
              {mode === 'register' && currentStep > 1 && (
                <button
                  type="button"
                  className="nav-btn prev-btn"
                  onClick={goToPrevStep}
                >
                  <span className="btn-arrow">←</span>
                  <span>Назад</span>
                </button>
              )}

              <button
                type="submit"
                className={`submit-btn ${loading ? 'loading' : ''} ${mode === 'register' && currentStep > 1 ? 'next-btn' : ''}`}
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
                      {mode === 'register' && currentStep < getTotalSteps() 
                        ? 'Продолжить' 
                        : mode === 'login' 
                        ? 'Войти' 
                        : mode === 'register' 
                        ? 'Создать аккаунт' 
                        : 'Присоединиться'}
                    </span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </div>
            )}
          </form>

          {/* Social Auth for Registration - Only on step 1 */}
          {mode === 'register' && currentStep === 1 && (
            <>
              <div className="divider">
                <span>или</span>
              </div>

              <div className="social-auth">
                <button type="button" className="social-btn google" onClick={() => console.log('Google register')}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M19.8 10.2273C19.8 9.51818 19.7364 8.83636 19.6182 8.18182H10V12.05H15.4818C15.2273 13.3 14.4636 14.3591 13.3182 15.0682V17.5773H16.7091C18.6091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
                    <path d="M10 20C12.7 20 14.9636 19.1045 16.7091 17.5773L13.3182 15.0682C12.3409 15.6682 11.0955 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.34545 11.9H0.854546V14.4909C2.59091 17.9591 6.04545 20 10 20Z" fill="#34A853"/>
                    <path d="M4.34545 11.9C4.12727 11.3 4 10.6591 4 10C4 9.34091 4.12727 8.7 4.34545 8.1V5.50909H0.854546C0.309091 6.59091 0 7.75909 0 10C0 12.2409 0.309091 13.4091 0.854546 14.4909L4.34545 11.9Z" fill="#FBBC04"/>
                    <path d="M10 3.97727C11.2182 3.97727 12.3091 4.38182 13.1818 5.21818L16.1727 2.22727C14.9591 1.08182 12.6955 0 10 0C6.04545 0 2.59091 2.04091 0.854546 5.50909L4.34545 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z" fill="#EA4335"/>
                  </svg>
                  <span>Зарегистрироваться с помощью Google</span>
                </button>
                <button type="button" className="social-btn github" onClick={() => console.log('GitHub register')}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                  </svg>
                  <span>Зарегистрироваться с помощью GitHub</span>
                </button>
              </div>

              <div className="auth-footer" style={{ marginTop: '20px' }}>
                <p>У вас уже есть аккаунт? <button type="button" className="link-btn" onClick={() => handleModeChange('login')}>Войти</button></p>
              </div>
            </>
          )}
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
          {/* End of auth-left */}

          {/* Right Side - Visual Content */}
          <div className="auth-right">
            <div className="visual-content">
              {/* Animated Logo/Icon */}
              <div className="visual-icon">
                <div className="icon-circle">
                  <svg viewBox="0 0 100 100" className="icon-svg">
                    <defs>
                      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b35" />
                        <stop offset="100%" stopColor="#f7931e" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#iconGradient)" strokeWidth="2" opacity="0.3"/>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="url(#iconGradient)" strokeWidth="2" opacity="0.5"/>
                    <path d="M50 20 L65 35 L50 35 L50 65 L65 65 L50 80 L35 65 L50 65 L50 35 L35 35 Z" 
                          fill="url(#iconGradient)" 
                          className="icon-path"/>
                  </svg>
                </div>
              </div>

              {/* Title and Description */}
              <h2 className="visual-title">
                {(mode === 'login' || mode === 'login-email') && 'С возвращением!'}
                {mode === 'register' && 'Начните свой путь'}
              </h2>
              
              <p className="visual-description">
                {(mode === 'login' || mode === 'login-email') && 'Войдите в систему для доступа к своим проектам и командной работе'}
                {mode === 'register' && 'Создайте аккаунт и получите доступ к мощным инструментам управления проектами'}
              </p>

              {/* Feature Cards */}
              <div className="visual-features">
                <div className="visual-feature-card">
                  <div className="feature-icon">⚡</div>
                  <h4>Быстрый старт</h4>
                  <p>Начните работу за считанные минуты</p>
                </div>
                <div className="visual-feature-card">
                  <div className="feature-icon">🔒</div>
                  <h4>Безопасность</h4>
                  <p>Ваши данные под надежной защитой</p>
                </div>
                <div className="visual-feature-card">
                  <div className="feature-icon">🚀</div>
                  <h4>Производительность</h4>
                  <p>Оптимизация рабочих процессов</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="decorative-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>

              {/* Stats */}
              {mode === 'register' && (
                <div className="visual-stats">
                  <div className="stat-item">
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Активных пользователей</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Завершенных проектов</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">99%</div>
                    <div className="stat-label">Удовлетворенность</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* End of auth-right */}
        </div>
        {/* End of auth-split-container */}
      </div>
    </div>
  );
};

export default Auth;
