import React, { useState, useEffect } from 'react';
import ImagePlaceholder from '../components/ImagePlaceholder';
import AnimatedCounter from '../components/AnimatedCounter';
import ScrollReveal from '../components/ScrollReveal';
import ThemeToggle from '../components/ThemeToggle';
import useDarkMode from '../hooks/useDarkMode';
import './Landing.css';

const Landing = () => {
  const [isDark, toggleTheme] = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing">
      {/* Animated Background Shapes */}
      <div className="liquid-shapes">
        <div className="liquid-shape shape-1"></div>
        <div className="liquid-shape shape-2"></div>
        <div className="liquid-shape shape-3"></div>
      </div>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">🎮</span>
              <span className="logo-text">Korastra</span>
            </div>
            <ul className="nav-links">
              <li><a href="#features">Возможности</a></li>
              <li><a href="#benefits">Преимущества</a></li>
              <li><a href="#pricing">Цены</a></li>
              <li><a href="#blog">Новости</a></li>
            </ul>
            <div className="nav-actions">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <button className="btn-secondary">Войти</button>
              <button className="btn-primary">Начать бесплатно</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <ScrollReveal animation="fade" duration={1000}>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="badge glass-effect">
                  <span className="badge-icon">✨</span>
                  Новое поколение управления проектами
                </div>
                <h1 className="hero-title">
                  Превратите работу в <span className="gradient-text">увлекательную игру</span>
                </h1>
                <p className="hero-description">
                  Korastra — инновационная платформа управления проектами с элементами геймификации. 
                  Мотивируйте команду, отслеживайте прогресс и достигайте целей с удовольствием.
                </p>
                <div className="hero-actions">
                  <button className="btn-primary btn-large">
                    <span>Начать бесплатно</span>
                    <span className="btn-icon">→</span>
                  </button>
                  <button className="btn-outline btn-large">
                    <span className="btn-icon">▶</span>
                    <span>Посмотреть демо</span>
                  </button>
                </div>
                <div className="hero-stats">
                  <AnimatedCounter end={500} suffix="+" label="Компаний" duration={2500} />
                  <AnimatedCounter end={10000} suffix="+" label="Пользователей" duration={3000} />
                  <AnimatedCounter end={95} suffix="%" label="Удовлетворены" duration={2000} />
                </div>
              </div>
              <div className="hero-image">
                <div className="mockup glass-effect">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="mockup-content">
                    <ImagePlaceholder type="dashboard" width="100%" height="400px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal animation="slide-up" delay={200}>
        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Возможности платформы</h2>
              <p className="section-description">
                Всё, что нужно для эффективного управления проектами и мотивации команды
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card glass-effect">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">Управление задачами</h3>
                <p className="feature-description">
                  Kanban-доски с drag-and-drop, спринты, приоритеты и дедлайны. 
                  Всё для организации работы команды.
                </p>
              </div>
              <div className="feature-card glass-effect">
                <div className="feature-icon">🏆</div>
                <h3 className="feature-title">Геймификация</h3>
                <p className="feature-description">
                  Очки опыта, достижения, уровни и рейтинги. 
                  Превратите рутину в захватывающее приключение.
                </p>
              </div>
              <div className="feature-card glass-effect">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Аналитика</h3>
                <p className="feature-description">
                  Детальная статистика, графики продуктивности и отчёты. 
                  Принимайте решения на основе данных.
                </p>
              </div>
              <div className="feature-card glass-effect">
                <div className="feature-icon">💬</div>
                <h3 className="feature-title">Встроенный чат</h3>
                <p className="feature-description">
                  Общайтесь с командой прямо в системе. 
                  Личные и групповые чаты с real-time обновлениями.
                </p>
              </div>
              <div className="feature-card glass-effect">
                <div className="feature-icon">🌳</div>
                <h3 className="feature-title">Дерево навыков</h3>
                <p className="feature-description">
                  Отслеживайте развитие компетенций каждого участника. 
                  Специализации и пассивные бонусы.
                </p>
              </div>
              <div className="feature-card glass-effect">
                <div className="feature-icon">🐾</div>
                <h3 className="feature-title">Виртуальные питомцы</h3>
                <p className="feature-description">
                  Кастомизируйте своего питомца, меняйте скины и аксессуары. 
                  Дополнительная мотивация для команды.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Benefits Section */}
      <ScrollReveal animation="slide-left" delay={100}>
        <section id="benefits" className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="section-title">Почему выбирают Korastra?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h3>Повышение мотивации на 80%</h3>
                    <p>Геймификация делает работу увлекательной и повышает вовлечённость команды</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h3>Прозрачность процессов</h3>
                    <p>Видьте прогресс в реальном времени и контролируйте выполнение задач</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h3>Экономия времени до 30%</h3>
                    <p>Автоматизация рутинных процессов и встроенные инструменты коммуникации</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h3>Гибкая настройка</h3>
                    <p>Адаптируйте систему под ваши процессы и методологии работы</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefits-visual">
              <div className="visual-card glass-effect">
                <ImagePlaceholder type="analytics" width="100%" height="400px" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Screenshots Section */}
      <ScrollReveal animation="scale" delay={150}>
        <section className="screenshots">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Интерфейс платформы</h2>
            <p className="section-description">
              Современный, интуитивно понятный дизайн для максимального комфорта работы
            </p>
          </div>
          <div className="screenshots-slider">
            <div className="screenshot-card glass-effect">
              <ImagePlaceholder type="kanban" width="800px" height="500px" />
              <div className="screenshot-label">Kanban-доска</div>
            </div>
            <div className="screenshot-card glass-effect">
              <ImagePlaceholder type="profile" width="800px" height="500px" />
              <div className="screenshot-label">Профиль пользователя</div>
            </div>
            <div className="screenshot-card glass-effect">
              <ImagePlaceholder type="leaderboard" width="800px" height="500px" />
              <div className="screenshot-label">Таблица лидеров</div>
            </div>
            <div className="screenshot-card glass-effect">
              <ImagePlaceholder type="chat" width="800px" height="500px" />
              <div className="screenshot-label">Встроенный чат</div>
            </div>
            <div className="screenshot-card glass-effect">
              <ImagePlaceholder type="skills" width="800px" height="500px" />
              <div className="screenshot-label">Дерево навыков</div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Pricing Section */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Выберите свой тариф</h2>
            <p className="section-description">
              Начните бесплатно и масштабируйтесь по мере роста команды
            </p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card glass-effect">
              <div className="pricing-header">
                <h3 className="pricing-title">Starter</h3>
                <div className="pricing-price">
                  <span className="price-currency">$</span>
                  <span className="price-value">0</span>
                  <span className="price-period">/месяц</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>✓ До 5 участников</li>
                <li>✓ 3 проекта</li>
                <li>✓ Базовая геймификация</li>
                <li>✓ 1 ГБ хранилища</li>
                <li>✓ Поддержка email</li>
              </ul>
              <button className="btn-outline btn-full">Начать бесплатно</button>
            </div>
            <div className="pricing-card glass-effect featured">
              <div className="pricing-badge">Популярный</div>
              <div className="pricing-header">
                <h3 className="pricing-title">Professional</h3>
                <div className="pricing-price">
                  <span className="price-currency">$</span>
                  <span className="price-value">29</span>
                  <span className="price-period">/месяц</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>✓ До 25 участников</li>
                <li>✓ Неограниченные проекты</li>
                <li>✓ Полная геймификация</li>
                <li>✓ 50 ГБ хранилища</li>
                <li>✓ Приоритетная поддержка</li>
                <li>✓ Аналитика и отчёты</li>
              </ul>
              <button className="btn-primary btn-full">Попробовать 14 дней</button>
            </div>
            <div className="pricing-card glass-effect">
              <div className="pricing-header">
                <h3 className="pricing-title">Enterprise</h3>
                <div className="pricing-price">
                  <span className="price-currency">$</span>
                  <span className="price-value">99</span>
                  <span className="price-period">/месяц</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>✓ Неограниченные участники</li>
                <li>✓ Неограниченные проекты</li>
                <li>✓ Все возможности Pro</li>
                <li>✓ 500 ГБ хранилища</li>
                <li>✓ Персональный менеджер</li>
                <li>✓ Кастомизация</li>
                <li>✓ API и интеграции</li>
              </ul>
              <button className="btn-outline btn-full">Связаться с нами</button>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Что говорят наши пользователи</h2>
            <p className="section-description">
              Тысячи команд уже используют Korastra для достижения своих целей
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card glass-effect">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Korastra полностью изменила подход нашей команды к работе. Геймификация действительно мотивирует!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>АС</div>
                <div className="author-info">
                  <div className="author-name">Алексей Смирнов</div>
                  <div className="author-position">Team Lead, TechCorp</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card glass-effect">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Интуитивный интерфейс и мощная аналитика. Теперь мы видим прогресс команды в реальном времени."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #FF8C42, #FFA056)' }}>МП</div>
                <div className="author-info">
                  <div className="author-name">Мария Петрова</div>
                  <div className="author-position">Product Manager, StartupHub</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card glass-effect">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Лучшая система управления проектами, которую я использовал. Достижения и уровни делают работу увлекательной!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #FFA056, #FFB870)' }}>ДК</div>
                <div className="author-info">
                  <div className="author-name">Дмитрий Козлов</div>
                  <div className="author-position">Scrum Master, DevTeam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Integration Section */}
      <ScrollReveal animation="fade" delay={100}>
        <section className="integration">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Интеграция с любимыми инструментами</h2>
              <p className="section-description">
                Korastra легко интегрируется с популярными сервисами для бесшовного рабочего процесса
              </p>
            </div>
            <div className="integration-grid">
              {/* GitHub */}
              <div className="integration-card glass-effect">
                <div className="integration-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <h4 className="integration-name">GitHub</h4>
                <p className="integration-desc">Синхронизация репозиториев и задач</p>
              </div>

              {/* Slack */}
              <div className="integration-card glass-effect">
                <div className="integration-icon slack">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                  </svg>
                </div>
                <h4 className="integration-name">Slack</h4>
                <p className="integration-desc">Уведомления в реальном времени</p>
              </div>

              {/* Jira */}
              <div className="integration-card glass-effect">
                <div className="integration-icon jira">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z"/>
                  </svg>
                </div>
                <h4 className="integration-name">Jira</h4>
                <p className="integration-desc">Импорт проектов и спринтов</p>
              </div>

              {/* Discord */}
              <div className="integration-card glass-effect">
                <div className="integration-icon discord">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <h4 className="integration-name">Discord</h4>
                <p className="integration-desc">Уведомления для команды</p>
              </div>

              {/* Trello */}
              <div className="integration-card glass-effect">
                <div className="integration-icon trello">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"/>
                  </svg>
                </div>
                <h4 className="integration-name">Trello</h4>
                <p className="integration-desc">Миграция досок и карточек</p>
              </div>

              {/* Google Workspace */}
              <div className="integration-card glass-effect">
                <div className="integration-icon google">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <h4 className="integration-name">Google Workspace</h4>
                <p className="integration-desc">Календарь и документы</p>
              </div>

              {/* Microsoft */}
              <div className="integration-card glass-effect">
                <div className="integration-icon microsoft">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 0v11.408h11.408V0zm12.594 0v11.408H24V0zM0 12.594V24h11.408V12.594zm12.594 0V24H24V12.594z" fill="#00A4EF"/>
                  </svg>
                </div>
                <h4 className="integration-name">Microsoft 365</h4>
                <p className="integration-desc">Teams и Office интеграция</p>
              </div>

              {/* Zoom */}
              <div className="integration-card glass-effect">
                <div className="integration-icon zoom">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.054 0c-.773 0-1.634.18-2.506.552-2.432 1.044-4.03 3.303-4.03 5.703v11.49c0 .677.095 1.305.274 1.87.18.563.467 1.067.863 1.497.396.43.888.773 1.467 1.02.58.247 1.25.371 1.997.371h14.83c.773 0 1.634-.18 2.506-.552 2.432-1.044 4.03-3.303 4.03-5.703V4.758c0-.677-.095-1.305-.274-1.87-.18-.563-.467-1.067-.863-1.497-.396-.43-.888-.773-1.467-1.02C24.302.124 23.632 0 22.885 0zm-.124 3.352h7.454c.18 0 .323.144.323.323v5.67c0 .18-.144.323-.323.323H4.648l-.01-.004c-.13-.003-.256-.088-.256-.219V6.73c0-1.862 1.332-3.378 2.968-3.378h.58zm8.387 0h6.568c1.636 0 2.968 1.516 2.968 3.378v6.915c0 1.862-1.332 3.378-2.968 3.378h-7.154c-.18 0-.323-.144-.323-.323v-12.67c0-.18.144-.678.323-.678z" fill="#2D8CFF"/>
                  </svg>
                </div>
                <h4 className="integration-name">Zoom</h4>
                <p className="integration-desc">Видеовстречи в один клик</p>
              </div>

            </div>
            
            <div className="integration-footer">
              <p className="integration-note">
                <span className="note-icon">🔌</span>
                И более 50+ других интеграций через API
              </p>
              <button className="btn-outline">Посмотреть все интеграции</button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section className="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Часто задаваемые вопросы</h2>
            <p className="section-description">
              Ответы на популярные вопросы о Korastra
            </p>
          </div>
          <div className="faq-grid">
            <div className="faq-item glass-effect">
              <h3 className="faq-question">Что такое геймификация в управлении проектами?</h3>
              <p className="faq-answer">
                Геймификация — это использование игровых элементов (очки, достижения, уровни) для мотивации команды. 
                В Korastra каждое выполненное задание приносит очки опыта, открывает достижения и повышает уровень участника.
              </p>
            </div>
            <div className="faq-item glass-effect">
              <h3 className="faq-question">Можно ли попробовать бесплатно?</h3>
              <p className="faq-answer">
                Да! Мы предлагаем бесплатный тариф Starter для команд до 5 человек, а также 14-дневный пробный период для тарифа Professional без необходимости вводить данные кредитной карты.
              </p>
            </div>
            <div className="faq-item glass-effect">
              <h3 className="faq-question">Поддерживается ли мобильная версия?</h3>
              <p className="faq-answer">
                Да, Korastra полностью адаптирована для мобильных устройств. Вы можете работать с проектами, общаться с командой и отслеживать прогресс с любого устройства.
              </p>
            </div>
            <div className="faq-item glass-effect">
              <h3 className="faq-question">Безопасны ли мои данные?</h3>
              <p className="faq-answer">
                Абсолютно! Мы используем шифрование данных, регулярное резервное копирование и соответствуем международным стандартам безопасности. Ваши данные хранятся на защищенных серверах.
              </p>
            </div>
            <div className="faq-item glass-effect">
              <h3 className="faq-question">Можно ли кастомизировать систему под свои процессы?</h3>
              <p className="faq-answer">
                Конечно! Korastra предлагает гибкие настройки: создавайте свои статусы задач, настраивайте систему достижений, адаптируйте рабочие процессы под методологию вашей команды (Scrum, Kanban и др.).
              </p>
            </div>
            <div className="faq-item glass-effect">
              <h3 className="faq-question">Есть ли техническая поддержка?</h3>
              <p className="faq-answer">
                Да! Мы предлагаем поддержку по email для всех пользователей. Клиенты тарифов Professional и Enterprise получают приоритетную поддержку и персонального менеджера.
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Blog & Roadmap Section */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section id="blog" className="blog-roadmap">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Новости и планы развития</h2>
              <p className="section-description">
                Следите за обновлениями платформы и узнавайте, что нас ждёт в будущем
              </p>
            </div>
            
            <div className="blog-roadmap-content">
              {/* Blog Section */}
              <div className="blog-section">
                <h3 className="subsection-title">📰 Последние новости</h3>
                <div className="blog-grid">
                  <div className="blog-card glass-effect">
                    <div className="blog-image">
                      <ImagePlaceholder type="dashboard" width="100%" height="200px" />
                    </div>
                    <div className="blog-content">
                      <span className="blog-date">15 января 2025</span>
                      <h4 className="blog-title">Обновление 2.0: Новые функции геймификации</h4>
                      <p className="blog-excerpt">
                        Представляем систему сезонных событий, новые достижения и улучшенную таблицу лидеров...
                      </p>
                      <a href="#article1" className="blog-link">Читать далее →</a>
                    </div>
                  </div>
                  
                  <div className="blog-card glass-effect">
                    <div className="blog-image">
                      <ImagePlaceholder type="team" width="100%" height="200px" />
                    </div>
                    <div className="blog-content">
                      <span className="blog-date">10 января 2025</span>
                      <h4 className="blog-title">Кейс: Как команда из 50 человек повысила продуктивность на 80%</h4>
                      <p className="blog-excerpt">
                        История успеха компании TechCorp и их опыт использования Korastra...
                      </p>
                      <a href="#article2" className="blog-link">Читать далее →</a>
                    </div>
                  </div>
                  
                  <div className="blog-card glass-effect">
                    <div className="blog-image">
                      <ImagePlaceholder type="analytics" width="100%" height="200px" />
                    </div>
                    <div className="blog-content">
                      <span className="blog-date">5 января 2025</span>
                      <h4 className="blog-title">Аналитика v2: Новые отчёты и метрики</h4>
                      <p className="blog-excerpt">
                        Представляем расширенную аналитику с прогнозами, трендами и AI-рекомендациями...
                      </p>
                      <a href="#article3" className="blog-link">Читать далее →</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roadmap Section */}
              <div className="roadmap-section">
                <h3 className="subsection-title">🗺️ Дорожная карта</h3>
                <div className="roadmap-timeline">
                  <div className="roadmap-item glass-effect completed">
                    <div className="roadmap-marker">
                      <span className="marker-icon">✓</span>
                    </div>
                    <div className="roadmap-content">
                      <span className="roadmap-quarter">Q4 2024</span>
                      <h4 className="roadmap-title">Базовая геймификация</h4>
                      <ul className="roadmap-features">
                        <li>Система уровней и опыта</li>
                        <li>Достижения и награды</li>
                        <li>Таблица лидеров</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="roadmap-item glass-effect active">
                    <div className="roadmap-marker">
                      <span className="marker-icon">🔄</span>
                    </div>
                    <div className="roadmap-content">
                      <span className="roadmap-quarter">Q1 2025</span>
                      <h4 className="roadmap-title">Расширенные возможности</h4>
                      <ul className="roadmap-features">
                        <li>Сезонные события и челленджи</li>
                        <li>Командные квесты</li>
                        <li>Расширенная кастомизация профилей</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="roadmap-item glass-effect">
                    <div className="roadmap-marker">
                      <span className="marker-icon">📅</span>
                    </div>
                    <div className="roadmap-content">
                      <span className="roadmap-quarter">Q2 2025</span>
                      <h4 className="roadmap-title">AI и автоматизация</h4>
                      <ul className="roadmap-features">
                        <li>AI-ассистент для планирования</li>
                        <li>Автоматическое распределение задач</li>
                        <li>Умные напоминания</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="roadmap-item glass-effect">
                    <div className="roadmap-marker">
                      <span className="marker-icon">🚀</span>
                    </div>
                    <div className="roadmap-content">
                      <span className="roadmap-quarter">Q3 2025</span>
                      <h4 className="roadmap-title">Мобильные приложения</h4>
                      <ul className="roadmap-features">
                        <li>Нативное iOS приложение</li>
                        <li>Нативное Android приложение</li>
                        <li>Offline режим</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal animation="scale" delay={100}>
        <section className="cta">
        <div className="container">
          <div className="cta-content glass-effect">
            <h2 className="cta-title">Готовы начать?</h2>
            <p className="cta-description">
              Присоединяйтесь к тысячам команд, которые уже используют Korastra
            </p>
            <div className="cta-actions">
              <button className="btn-primary btn-large">
                <span>Создать аккаунт бесплатно</span>
                <span className="btn-icon">→</span>
              </button>
            </div>
            <p className="cta-note">Кредитная карта не требуется · 14 дней бесплатно</p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🎮</span>
                <span className="logo-text">Korastra</span>
              </div>
              <p className="footer-description">
                Превращаем управление проектами в увлекательное путешествие
              </p>
            </div>
            <div className="footer-section">
              <h4>Продукт</h4>
              <ul>
                <li><a href="#features">Возможности</a></li>
                <li><a href="#pricing">Цены</a></li>
                <li><a href="#demo">Демо</a></li>
                <li><a href="#updates">Обновления</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Компания</h4>
              <ul>
                <li><a href="#about">О нас</a></li>
                <li><a href="#blog">Блог</a></li>
                <li><a href="#careers">Карьера</a></li>
                <li><a href="#contact">Контакты</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Поддержка</h4>
              <ul>
                <li><a href="#help">Справка</a></li>
                <li><a href="#docs">Документация</a></li>
                <li><a href="#api">API</a></li>
                <li><a href="#status">Статус</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Korastra. Все права защищены.</p>
            <div className="footer-links">
              <a href="#privacy">Конфиденциальность</a>
              <a href="#terms">Условия</a>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
