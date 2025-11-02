import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import ImagePlaceholder from '../components/ImagePlaceholder';
import useDarkMode from '../hooks/useDarkMode';
import '../styles/pages/About.css';

const About = () => {
  const [isDark, toggleTheme] = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const team = [
    {
      name: 'Темирлан Оспанов',
      position: 'Frontend Developer',
      description: 'Создатель увлекательных пользовательских интерфейсов',
      gradient: 'linear-gradient(135deg, #FF6B35, #FF8C42)',
      initials: 'ТО',
      avatar: 'https://avatars.githubusercontent.com/u/187307610?v=4', // Вставьте URL ссылку на аватарку
      github: 'https://github.com/TemirlanOspanov'
    },
    {
      name: 'Дильдар Дюсембеев',
      position: 'Backend Developer',
      description: 'Эксперт в области архитектуры и масштабирования',
      gradient: 'linear-gradient(135deg, #FF8C42, #FFA056)',
      initials: 'ДД',
      avatar: 'https://avatars.githubusercontent.com/u/167680253?v=4', // Вставьте URL ссылку на аватарку
      github: 'https://github.com/Dildar05'
    },
    {
      name: 'Оскар Сальников',
      position: 'Head of Product',
      description: 'Создатель пользовательских впечатлений',
      gradient: 'linear-gradient(135deg, #FFA056, #FFB870)',
      initials: 'ОС',
      avatar: 'https://avatars.githubusercontent.com/u/187437301?v=4', // Вставьте URL ссылку на аватарку
      github: 'https://github.com/OscarSalnikov'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Фокус на результате',
      description: 'Мы помогаем командам достигать целей эффективно и с удовольствием'
    },
    {
      icon: '💡',
      title: 'Инновации',
      description: 'Постоянно развиваемся и внедряем новейшие технологии и подходы'
    },
    {
      icon: '🤝',
      title: 'Командная работа',
      description: 'Верим в силу коллективного интеллекта и взаимопомощи'
    },
    {
      icon: '🚀',
      title: 'Рост и развитие',
      description: 'Создаём условия для постоянного обучения и профессионального роста'
    },
    {
      icon: '❤️',
      title: 'Забота о людях',
      description: 'Ставим людей на первое место и создаём комфортную рабочую среду'
    },
    {
      icon: '🌟',
      title: 'Превосходство',
      description: 'Стремимся к качеству во всём, что делаем'
    }
  ];

  const milestones = [
    {
      year: 'Сентябрь 2025',
      title: 'Начало дипломного проекта',
      description: 'Формирование команды из 3 студентов и выбор темы: система управления проектами с геймификацией'
    },
    {
      year: 'Октябрь 2025',
      title: 'Исследование и планирование',
      description: 'Анализ существующих решений, разработка архитектуры и выбор технологического стека'
    },
    {
      year: 'Ноябрь 2025',
      title: 'Разработка MVP',
      description: 'Создание базовой функциональности: авторизация, управление задачами, первые элементы геймификации'
    },
    {
      year: 'Декабрь 2025',
      title: 'Первые результаты',
      description: 'Тестирование прототипа, сбор обратной связи и корректировка функционала'
    },
    {
      year: 'Январь-Апрель 2026',
      title: 'Активная разработка',
      description: 'Реализация полного функционала: дашборды, аналитика, система достижений, интеграции'
    },
    {
      year: 'Май 2026',
      title: 'Защита дипломной работы',
      description: 'Финальное тестирование, подготовка документации и презентация проекта'
    }
  ];

  return (
    <div className="about-page">
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
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-content">
              <div className="badge glass-effect">
                <span className="badge-icon">👋</span>
                О нас
              </div>
              <h1 className="about-hero-title">
                Мы создаём будущее <span className="gradient-text">управления проектами</span>
              </h1>
              <p className="about-hero-description">
                Korastra была основана с одной простой идеей: сделать работу увлекательной. 
                Мы верим, что продуктивность и удовольствие от работы идут рука об руку, 
                и создали платформу, которая доказывает это каждый день.
              </p>
              <div className="about-hero-stats">
                <AnimatedCounter end={3} suffix="+" label="Участника проекта" duration={2500} />
                <AnimatedCounter end={5} suffix="+" label="Исследованных методологий" duration={3000} />
                <AnimatedCounter end={8} label="Месяцев разработки" duration={2000} />
                <AnimatedCounter end={1} label="Ключевая цель: успешная защита проекта" duration={2500} />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Mission & Vision Section */}
      <ScrollReveal animation="slide-up" delay={200}>
        <section className="mission-vision">
          <div className="container">
            <div className="mission-vision-grid">
              <div className="mission-card glass-effect">
                <div className="mission-icon">🎯</div>
                <h2 className="mission-title">Наша миссия</h2>
                <p className="mission-description">
                  Трансформировать способ работы команд по всему миру, делая управление проектами 
                  интуитивным, увлекательным и мотивирующим. Мы стремимся помочь каждой команде 
                  раскрыть свой потенциал через инновационные решения и геймификацию.
                </p>
              </div>
              <div className="vision-card glass-effect">
                <div className="vision-icon">🚀</div>
                <h2 className="vision-title">Наше видение</h2>
                <p className="vision-description">
                  Стать глобальным лидером в области геймифицированного управления проектами, 
                  создав экосистему, где каждая команда находит радость в достижении своих целей. 
                  Мы видим будущее, где работа вдохновляет, а успех приносит удовольствие.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values Section */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section className="values">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Наши ценности</h2>
              <p className="section-description">
                Принципы, которые определяют наш подход к работе и взаимодействию
              </p>
            </div>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card glass-effect">
                  <div className="value-icon">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Story Section */}
      <ScrollReveal animation="slide-left" delay={100}>
        <section className="story">
          <div className="container">
            <div className="story-content">
              <div className="story-text">
                <h2 className="section-title">Наша история</h2>
                <p className="story-paragraph">
                  Всё началось в сентябре этого года, когда мы, группа энтузиастов, 
                  собрались для работы над нашим дипломным проектом. 
                  Нашей целью стало решение проблемы, с которой сталкивается практически каждая команда:
                   как превратить управление проектами из рутинной обязанности в увлекательный и мотивирующий процесс.
                </p>
                <p className="story-paragraph">
                 Мы заметили, что многие традиционные системы управления проектами могут снижать мотивацию, 
                 сводя всю работу к бесконечному перечню задач. 
                 Так у нас родилась идея для нашего дипломного проекта — создать систему проектирования задач, 
                 которая объединит проверенные методологии управления с элементами геймификации.
                </p>
                <p className="story-paragraph">
                 Сейчас мы полностью сфокусированы на разработке этой системы. 
                 Мы стремимся создать инструмент, который поможет командам работать эффективнее,
                  поддерживая их вовлечённость и интерес к процессу.
                   Мы активно изучаем потребности пользователей и внедряем инновационные решения, 
                 которые действительно могут изменить подход к управлению задачами в рамках нашего проекта.
                </p>
                <div className="story-quote glass-effect">
                  <p className="quote-text">
                    "Работа не должна быть скучной. Мы доказываем это каждый день."
                  </p>
                  <p className="quote-author">— Дильдар Дюсембеев, CEO & Developer</p>
                </div>
              </div>
              <div className="story-visual">
                <div className="story-image-card glass-effect">
                  <img 
                    src="/images/team-photo.jpeg" 
                    alt="Наша команда" 
                    style={{ 
                      width: '100%', 
                      height: '500px', 
                      objectFit: 'cover',
                      borderRadius: '32px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Timeline Section */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section className="timeline">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Наш путь</h2>
              <p className="section-description">
                История разработки дипломного проекта от первой идеи до готового продукта
              </p>
            </div>
            <div className="timeline-wrapper">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="timeline-content glass-effect">
                    <div className="timeline-year">{milestone.year}</div>
                    <h3 className="timeline-title">{milestone.title}</h3>
                    <p className="timeline-description">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Team Section */}
      <ScrollReveal animation="scale" delay={150}>
        <section className="team">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Наша команда</h2>
              <p className="section-description">
                Познакомьтесь с людьми, которые создают Korastra
              </p>
            </div>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card glass-effect">
                  <div 
                    className="team-avatar" 
                    style={{ 
                      background: member.avatar ? 'none' : member.gradient,
                      backgroundImage: member.avatar ? `url(${member.avatar})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!member.avatar && member.initials}
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-position">{member.position}</p>
                  <p className="team-description">{member.description}</p>
                  <div className="team-social">
                    <a 
                      href={member.github} 
                      className="team-social-link" 
                      aria-label="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Culture Section */}
      {/* 
      <ScrollReveal animation="slide-up" delay={100}>
        <section className="culture">
          <div className="container">
            <div className="culture-content">
              <div className="culture-visual">
                <div className="culture-image-card glass-effect">
                  <ImagePlaceholder type="office" width="100%" height="400px" />
                </div>
              </div>
              <div className="culture-text">
                <h2 className="section-title">Работа в Korastra</h2>
                <p className="culture-description">
                  Мы не просто создаём продукт для геймификации — мы живём по этим принципам. 
                  В Korastra каждый день полон вызовов, достижений и возможностей для роста.
                </p>
                <div className="culture-benefits">
                  <div className="culture-benefit">
                    <span className="benefit-icon">🏠</span>
                    <div className="benefit-text">
                      <h4>Гибридная работа</h4>
                      <p>Офис + удалёнка по вашему выбору</p>
                    </div>
                  </div>
                  <div className="culture-benefit">
                    <span className="benefit-icon">📚</span>
                    <div className="benefit-text">
                      <h4>Обучение и развитие</h4>
                      <p>Бюджет на курсы и конференции</p>
                    </div>
                  </div>
                  <div className="culture-benefit">
                    <span className="benefit-icon">🎮</span>
                    <div className="benefit-text">
                      <h4>Геймификация внутри</h4>
                      <p>Используем наш продукт для работы</p>
                    </div>
                  </div>
                  <div className="culture-benefit">
                    <span className="benefit-icon">🌴</span>
                    <div className="benefit-text">
                      <h4>Отпуск без границ</h4>
                      <p>Unlimited vacation policy</p>
                    </div>
                  </div>
                </div>
                <a href="#careers" className="btn-primary">
                  <span>Посмотреть вакансии</span>
                  <span className="btn-icon">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      */}

      {/* Partners Section */}
      {/* 
      <ScrollReveal animation="fade" delay={100}>
        <section className="partners">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Нам доверяют</h2>
              <p className="section-description">
                Компании, которые выбрали Korastra для своих команд
              </p>
            </div>
            <div className="partners-grid">
              <div className="partner-logo glass-effect">
                <ImagePlaceholder type="logo" width="180px" height="80px" />
              </div>
              <div className="partner-logo glass-effect">
                <ImagePlaceholder type="logo" width="180px" height="80px" />
              </div>
              <div className="partner-logo glass-effect">
                <ImagePlaceholder type="logo" width="180px" height="80px" />
              </div>
              <div className="partner-logo glass-effect">
                <ImagePlaceholder type="logo" width="180px" height="80px" />
              </div>
              <div className="partner-logo glass-effect">
                <ImagePlaceholder type="logo" width="180px" height="80px" />
              </div>
              <div className="partner-logo glass-effect">
                <ImagePlaceholder type="logo" width="180px" height="80px" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      */}

      {/* CTA Section */}
      <ScrollReveal animation="scale" delay={100}>
        <section className="about-cta">
          <div className="container">
            <div className="about-cta-content glass-effect">
              <h2 className="about-cta-title">Присоединяйтесь к нам</h2>
              <p className="about-cta-description">
                Станьте частью революции в управлении проектами
              </p>
              <div className="about-cta-actions">
                <a href="#signup" className="btn-primary btn-large">
                  <span>Начать бесплатно</span>
                  <span className="btn-icon">→</span>
                </a>
                <a href="#contact" className="btn-outline btn-large">
                  <span>Связаться с нами</span>
                </a>
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

export default About;
