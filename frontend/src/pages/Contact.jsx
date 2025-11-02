import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import useDarkMode from '../hooks/useDarkMode';
import '../styles/pages/Contact.css';

const Contact = () => {
  const [isDark, toggleTheme] = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    setFormStatus('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setFormStatus('');
    }, 5000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      info: 'korastra@example.com',
      link: 'mailto:korastra@example.com'
    },
    {
      icon: '📱',
      title: 'Телефон',
      info: '+7 (XXX) XXX-XX-XX',
      link: 'tel:+7XXXXXXXXXX'
    },
    {
      icon: '📍',
      title: 'Адрес',
      info: 'Алматы, Казахстан',
      link: null
    },
    {
      icon: '⏰',
      title: 'Часы работы',
      info: 'Пн-Пт: 9:00 - 18:00',
      link: null
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/Dildar05',
      color: '#333'
    },
    {
      name: 'Discord',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      url: '#discord',
      color: '#5865F2'
    },
    {
      name: 'Telegram',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.02.474z"/>
        </svg>
      ),
      url: 'https://t.me/Predator_TDK',
      color: '#0088cc'
    }
  ];

  const faqItems = [
    {
      question: 'Как быстро вы отвечаете на запросы?',
      answer: 'Мы стараемся отвечать на все запросы в течение 24 часов в рабочие дни.'
    },
    {
      question: 'Можно ли заказать демонстрацию продукта?',
      answer: 'Да, конечно! Напишите нам, и мы организуем персональную демонстрацию Korastra.'
    },
    {
      question: 'Есть ли техническая поддержка?',
      answer: 'Да, наша команда поддержки готова помочь вам по всем техническим вопросам.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Animated Background Shapes */}
      <div className="liquid-shapes">
        <div className="liquid-shape shape-1"></div>
        <div className="liquid-shape shape-2"></div>
        <div className="liquid-shape shape-3"></div>
      </div>

      {/* Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} isScrolled={isScrolled} />

      {/* Hero Section */}
      <ScrollReveal animation="fade" duration={1000}>
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero-content">
              <div className="badge glass-effect">
                <span className="badge-icon">💬</span>
                Свяжитесь с нами
              </div>
              <h1 className="contact-hero-title">
                Мы всегда <span className="gradient-text">на связи</span>
              </h1>
              <p className="contact-hero-description">
                Есть вопросы о Korastra? Хотите обсудить возможности сотрудничества? 
                Или просто хотите поделиться своими идеями? Мы будем рады услышать вас!
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Info Cards */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section className="contact-info-section">
          <div className="container">
            <div className="contact-info-grid">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-info-card glass-effect">
                  <div className="info-icon">{item.icon}</div>
                  <h3 className="info-title">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} className="info-content">{item.info}</a>
                  ) : (
                    <p className="info-content">{item.info}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Form & Map Section */}
      <ScrollReveal animation="slide-up" delay={150}>
        <section className="contact-form-section">
          <div className="container">
            <div className="contact-form-wrapper">
              <div className="form-container glass-effect">
                <h2 className="form-title">Напишите нам</h2>
                <p className="form-description">
                  Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                </p>
                
                {formStatus && (
                  <div className="form-status glass-effect success">
                    {formStatus}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Имя *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ваше имя"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Тема</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Тема сообщения"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Сообщение *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Расскажите нам подробнее..."
                      className="form-input form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-large btn-full">
                    <span>Отправить сообщение</span>
                    <span className="btn-icon">→</span>
                  </button>
                </form>
              </div>

              <div className="contact-sidebar">
                <div className="sidebar-card glass-effect">
                  <h3 className="sidebar-title">Социальные сети</h3>
                  <p className="sidebar-description">
                    Следите за нашими обновлениями в социальных сетях
                  </p>
                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="social-link-large"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <div className="social-icon">{social.icon}</div>
                        <span className="social-name">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="sidebar-card glass-effect">
                  <h3 className="sidebar-title">Часто задаваемые вопросы</h3>
                  <div className="faq-list">
                    {faqItems.map((item, index) => (
                      <div key={index} className="faq-item-small">
                        <h4 className="faq-question-small">{item.question}</h4>
                        <p className="faq-answer-small">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
