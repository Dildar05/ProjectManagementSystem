import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/components/Header.css';

const Header = ({ isDark, toggleTheme, isScrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

  // Function to handle section navigation
  const handleSectionClick = (sectionId) => {
    // If we're not on the landing page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // Already on landing page, just scroll
      scrollToSection(sectionId);
    }
  };

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="logo-icon">🎮</span>
            <span className="logo-text">Korastra</span>
          </div>
          <ul className="nav-links">
            <li 
              className="nav-item dropdown"
              onMouseEnter={() => setIsCompanyDropdownOpen(true)}
              onMouseLeave={() => setIsCompanyDropdownOpen(false)}
            >
              <span className="nav-link dropdown-trigger">
                Компания
                <svg 
                  className={`dropdown-arrow ${isCompanyDropdownOpen ? 'open' : ''}`}
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="currentColor"
                >
                  <path d="M6 8L2 4h8L6 8z"/>
                </svg>
              </span>
              <ul className={`dropdown-menu ${isCompanyDropdownOpen ? 'open' : ''}`}>
                <li><a href="/about">О нас</a></li>
                <li><span onClick={() => handleSectionClick('blog')} style={{ cursor: 'pointer' }}>Блог</span></li>
                <li><a href="/contact">Контакты</a></li>
              </ul>
            </li>
            <li><span className="nav-link" onClick={() => handleSectionClick('features')} style={{ cursor: 'pointer' }}>Возможности</span></li>
            <li><span className="nav-link" onClick={() => handleSectionClick('benefits')} style={{ cursor: 'pointer' }}>Преимущества</span></li>
            <li><span className="nav-link" onClick={() => handleSectionClick('pricing')} style={{ cursor: 'pointer' }}>Цены</span></li>
            <li><span className="nav-link" onClick={() => handleSectionClick('blog')} style={{ cursor: 'pointer' }}>Новости</span></li>
          </ul>
          <div className="nav-actions">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button className="btn-secondary" onClick={() => navigate('/auth?mode=login')}>Войти</button>
            <button className="btn-primary" onClick={() => navigate('/auth?mode=register')}>Регистрация</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
