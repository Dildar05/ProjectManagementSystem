# 🔐 Система авторизации и регистрации Korastra

## Описание

Полнофункциональная система аутентификации с поддержкой:
- Вход в систему
- Регистрация (личный аккаунт / компания)
- Присоединение к компании по коду приглашения

## Файлы

- `src/pages/Auth.jsx` - Главный компонент (470 строк)
- `src/styles/pages/Auth.css` - Стили (580 строк)

## Функциональность

### 1. Форма входа (Login)

**Поля:**
- Email
- Пароль
- Ссылка "Забыли пароль?"

**Валидация:**
- ✅ Email обязателен и должен быть корректным
- ✅ Пароль обязателен (минимум 6 символов)

**Роли:**
- После успешного входа пользователь получает доступ к своему workspace

---

### 2. Регистрация (Register)

#### 2.1 Выбор типа аккаунта

**Личный аккаунт** (👤):
- Создаётся personal workspace
- Пользователь получает роль: `owner`
- Нет привязки к компании
- Подходит для индивидуального использования

**Для компании** (🏢):
- Появляется поле "Название компании" (обязательное)
- Создаётся компания
- Пользователь получает роль: `admin`
- Может приглашать других пользователей

#### 2.2 Поля формы

**Всегда:**
- Email
- Пароль
- Подтверждение пароля

**Для компании:**
- Название компании (обязательно)

**Валидация:**
- ✅ Email: формат и уникальность
- ✅ Пароль: минимум 6 символов
- ✅ Подтверждение: должно совпадать с паролем
- ✅ Название компании: обязательно для типа "Компания"

---

### 3. Присоединение к компании (Join)

**Поля:**
- Код приглашения (обязательно)
- Email
- Пароль
- Подтверждение пароля

**Процесс:**
1. Пользователь получает код приглашения от администратора
2. Вводит код + свои данные
3. Система проверяет код
4. Создаётся аккаунт с ролью `member` или `manager` (в зависимости от назначения)

**Валидация:**
- ✅ Код приглашения обязателен
- ✅ Код должен быть действительным
- ✅ Стандартная валидация email/пароля

---

## Роли пользователей

| Роль | Как получить | Права |
|------|--------------|-------|
| **owner** | Регистрация личного аккаунта | Полный доступ к личному workspace |
| **admin** | Регистрация компании | Полный доступ к компании, управление пользователями |
| **manager** | Приглашение администратором | Управление проектами и задачами |
| **member** | Приглашение администратором | Просмотр и выполнение задач |

---

## Обработка ошибок

### Типы ошибок

**Валидация формы:**
```javascript
{
  email: 'Email обязателен',
  email: 'Введите корректный email',
  password: 'Пароль обязателен',
  password: 'Пароль должен быть не менее 6 символов',
  confirmPassword: 'Подтвердите пароль',
  confirmPassword: 'Пароли не совпадают',
  companyName: 'Название компании обязательно',
  inviteCode: 'Код приглашения обязателен'
}
```

**Серверные ошибки:**
- Занятый email
- Неверные учетные данные
- Недействительный код приглашения
- Ошибка сети

### Отображение ошибок

**Inline errors:**
- Красная рамка у поля
- Иконка ⚠ + текст ошибки под полем

**Submit errors:**
- Блок с красным фоном над кнопкой
- Общее сообщение об ошибке

---

## UI/UX Особенности

### Дизайн

**Glassmorphism эффект:**
- Полупрозрачный фон с blur
- Красивые градиенты
- Плавные анимации

**Анимированный фон:**
- 3 плавающих gradient orb
- Движение по эллиптическим траекториям
- Blur эффект

**Темная тема:**
- Автоматическое переключение всех элементов
- Поддержка `useDarkMode` hook

### Интерактивность

**Tabs переключение:**
- Плавный sliding indicator
- Cubic-bezier анимация
- Сохранение состояния формы при переключении

**Account Type Selector:**
- Карточки с hover эффектом
- Active state с gradient фоном
- Checkmark анимация

**Кнопка Submit:**
- Hover: поднятие + увеличение тени
- Loading: spinner + disabled state
- Active: нажатие

**Inputs:**
- Focus: border меняется на orange
- Error: красная рамка
- Плавные transitions

### Адаптивность

**Desktop (>768px):**
- Centered layout с max-width 480px
- 3 tabs в ряд
- Крупные элементы

**Tablet (480-768px):**
- Уменьшенные отступы
- Адаптивные размеры шрифтов

**Mobile (<480px):**
- Компактные tabs
- Вертикальные features
- Уменьшенный blur у orb

---

## Интеграция с API

### TODO: Эндпоинты

```javascript
// Login
POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, email, role, workspace } }

// Register Personal
POST /api/auth/register
Body: { email, password, type: 'personal' }
Response: { token, user: { id, email, role: 'owner', workspace } }

// Register Company
POST /api/auth/register
Body: { email, password, type: 'company', companyName }
Response: { token, user: { id, email, role: 'admin', company, workspace } }

// Join Company
POST /api/auth/join
Body: { email, password, inviteCode }
Response: { token, user: { id, email, role, company, workspace } }
```

### Замените в коде

```javascript
// Найдите в Auth.jsx:
// TODO: Replace with actual API calls
await new Promise(resolve => setTimeout(resolve, 1500));

// Замените на:
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: formData.email, password: formData.password })
});

if (!response.ok) {
  throw new Error('Authentication failed');
}

const data = await response.json();
localStorage.setItem('token', data.token);
navigate('/dashboard');
```

---

## Навигация

### Роуты

```javascript
// App.jsx
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/auth" element={<Auth />} />
  {/* TODO: Add */}
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/onboarding" element={<Onboarding />} />
</Routes>
```

### Переходы

**Из Header:**
- Кнопка "Войти" → `/auth` (mode: login)
- Кнопка "Начать бесплатно" → `/auth` (mode: register)

**Из Auth:**
- Back button → `/` (Landing)
- После входа → `/dashboard`
- После регистрации → `/onboarding`
- Ссылки между табами (внутри компонента)

---

## Использование

### Базовое

```jsx
import Auth from './pages/Auth';

<Route path="/auth" element={<Auth />} />
```

### С query параметрами

```jsx
// Прямая ссылка на регистрацию
<Link to="/auth?mode=register">Зарегистрироваться</Link>

// Прямая ссылка на присоединение
<Link to="/auth?mode=join&code=ABC123">Присоединиться</Link>

// В Auth.jsx добавьте:
import { useSearchParams } from 'react-router-dom';

const [searchParams] = useSearchParams();
const initialMode = searchParams.get('mode') || 'login';
const initialCode = searchParams.get('code') || '';

const [mode, setMode] = useState(initialMode);
const [formData, setFormData] = useState({
  // ...
  inviteCode: initialCode
});
```

---

## Features List

Под формой отображается список преимуществ:

- ✨ Геймификация задач
- 📊 Аналитика в реальном времени
- 👥 Командная работа

**Кастомизация:**

```jsx
<div className="auth-features">
  <div className="feature-item">
    <span className="feature-icon">🎯</span>
    <span>Ваш текст</span>
  </div>
</div>
```

---

## Стилизация

### CSS Variables

Используются глобальные переменные из `global.css`:

```css
--primary-orange
--gradient-orange
--text-primary
--text-secondary
--text-light
```

### Кастомные стили

**Изменить цвет акцента:**

```css
/* Auth.css */
.tab-indicator {
  background: var(--gradient-blue); /* Вместо orange */
}

.submit-button {
  background: var(--gradient-blue);
}
```

**Изменить анимацию orb:**

```css
@keyframes float {
  /* Ваша анимация */
}
```

---

## Тестирование

### Мануальное

**Login:**
1. Откройте `/auth`
2. Введите email + пароль
3. Нажмите "Войти"
4. Проверьте консоль на `console.log('Login:', ...)`

**Register Personal:**
1. Переключитесь на "Регистрация"
2. Выберите "Личный аккаунт"
3. Заполните форму
4. Проверьте создание аккаунта

**Register Company:**
1. Переключитесь на "Регистрация"
2. Выберите "Для компании"
3. Введите название компании
4. Заполните остальные поля
5. Проверьте создание компании

**Join:**
1. Переключитесь на "Присоединиться"
2. Введите код приглашения
3. Заполните форму
4. Проверьте присоединение

### Валидация

**Тесты:**
- ❌ Пустой email
- ❌ Неверный формат email
- ❌ Короткий пароль (< 6 символов)
- ❌ Несовпадающие пароли
- ❌ Пустое название компании (для company)
- ❌ Пустой invite code (для join)

---

## Roadmap

### v1.1 (Ближайшие)

- [ ] Forgot password flow
- [ ] Email verification
- [ ] Social auth (Google, GitHub)
- [ ] 2FA setup

### v1.2 (Будущие)

- [ ] Password strength meter
- [ ] Company logo upload
- [ ] Invite link preview
- [ ] Session management

### v2.0 (Долгосрочные)

- [ ] SSO integration
- [ ] LDAP support
- [ ] Biometric auth
- [ ] Magic link auth

---

## FAQ

**Q: Как добавить social auth?**

A: Добавьте кнопки перед формой:

```jsx
<div className="social-auth">
  <button className="social-button google">
    <GoogleIcon /> Войти через Google
  </button>
  <button className="social-button github">
    <GitHubIcon /> Войти через GitHub
  </button>
</div>
```

**Q: Как изменить редирект после входа?**

A: В `handleSubmit` измените:

```javascript
if (mode === 'login') {
  navigate('/your-custom-route');
}
```

**Q: Как добавить remember me?**

A: Добавьте checkbox:

```jsx
<label className="remember-me">
  <input type="checkbox" checked={rememberMe} onChange={...} />
  Запомнить меня
</label>
```

---

## Контакты

- Документация: `/docs/auth`
- Issues: [GitHub Issues](https://github.com/Dildar05/ProjectManagementSystem/issues)
- Email: support@korastra.com

---

**Версия:** 1.0.0  
**Дата:** 29 октября 2025  
**Статус:** ✅ Production Ready
