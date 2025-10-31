# Дизайн-система Korastra

## 🎨 Цветовая палитра

### Основные цвета (Primary)
```css
--primary-orange: #FF6B35;        /* Основной оранжевый */
--primary-orange-light: #FF8C42;  /* Светлый оранжевый */
--primary-orange-lighter: #FFA056; /* Еще светлее */
--primary-orange-dark: #E85A2C;   /* Темный оранжевый */
```

### Градиенты
```css
--gradient-orange: linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FFA056 100%);
--gradient-orange-reverse: linear-gradient(135deg, #FFA056 0%, #FF8C42 50%, #FF6B35 100%);
```

### Текст
```css
--text-primary: #1a1a1a;   /* Основной текст */
--text-secondary: #666666; /* Вторичный текст */
--text-light: #999999;     /* Светлый текст */
```

### Фон
```css
--bg-light: #fafafa;       /* Светлый фон */
--bg-white: #ffffff;       /* Белый фон */
```

### Glass эффекты
```css
--glass-bg: rgba(255, 255, 255, 0.1);     /* Фон стекла */
--glass-border: rgba(255, 255, 255, 0.2); /* Граница стекла */
```

### Тени
```css
--shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.15);
```

## 📝 Типографика

### Шрифт
- **Основной**: Inter (Google Fonts)
- **Запасные**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Размеры заголовков
```css
h1 (Hero): 56px / 800 weight / -0.02em letter-spacing
h2 (Section): 48px / 800 weight / -0.02em letter-spacing
h3 (Card): 24px / 700 weight
h4 (Footer): 16px / 700 weight
```

### Размеры текста
```css
Body Large: 18px / 500 weight / 1.8 line-height
Body Regular: 16px / 400 weight / 1.6 line-height
Body Small: 14px / 400 weight / 1.6 line-height
Caption: 12px / 500 weight
```

## 🔘 Кнопки

### Стили кнопок

#### Primary Button
```css
background: var(--gradient-orange);
color: white;
padding: 12px 24px;
border-radius: 12px;
box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);

/* Hover */
transform: translateY(-2px);
box-shadow: 0 6px 24px rgba(255, 107, 53, 0.4);
```

#### Secondary Button
```css
background: rgba(255, 255, 255, 0.8);
color: var(--text-primary);
border: 1px solid rgba(255, 255, 255, 0.3);

/* Hover */
background: rgba(255, 255, 255, 1);
transform: translateY(-2px);
```

#### Outline Button
```css
background: transparent;
color: var(--text-primary);
border: 2px solid rgba(0, 0, 0, 0.1);

/* Hover */
border-color: var(--primary-orange);
color: var(--primary-orange);
transform: translateY(-2px);
```

### Размеры кнопок
- **Regular**: padding: 12px 24px, font-size: 14px
- **Large**: padding: 16px 32px, font-size: 16px

## 🎴 Карточки (Cards)

### Feature Card
```css
padding: 32px;
border-radius: 24px;
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

/* Hover */
transform: translateY(-8px);
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
```

### Pricing Card
```css
padding: 40px;
border-radius: 24px;

/* Featured Variant */
border: 2px solid var(--primary-orange);
box-shadow: 0 12px 40px rgba(255, 107, 53, 0.2);
```

### Screenshot Card
```css
min-width: 600px;
border-radius: 24px;
overflow: hidden;

/* Hover */
transform: scale(1.02);
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
```

## 🌊 Liquid Shapes (Жидкие формы)

### Shape 1
```css
width: 500px;
height: 500px;
animation-duration: 25s;
top: -200px;
left: -200px;
```

### Shape 2
```css
width: 600px;
height: 600px;
animation-duration: 30s;
top: 50%;
right: -300px;
```

### Shape 3
```css
width: 400px;
height: 400px;
animation-duration: 35s;
bottom: -150px;
left: 20%;
```

### Анимация
```css
@keyframes liquidMove {
  0%, 100%: translate(0, 0) rotate(0deg) scale(1)
  25%: translate(50px, 100px) rotate(90deg) scale(1.1)
  50%: translate(100px, 50px) rotate(180deg) scale(0.9)
  75%: translate(30px, -50px) rotate(270deg) scale(1.05)
}
```

## 🎭 Иконки (Эмодзи)

### Используемые иконки
- 🎮 - Логотип / Геймификация
- 🎯 - Управление задачами
- 🏆 - Достижения
- 📊 - Аналитика
- 💬 - Чат
- 🌳 - Дерево навыков
- 🐾 - Питомцы
- ✨ - Новые функции
- → - Стрелка вправо
- ▶ - Play кнопка
- ✓ - Галочка (Benefits, Pricing)

## 📐 Spacing System

### Padding/Margin Scale
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 80px
5xl: 120px
```

## 📱 Breakpoints

```css
Mobile: 0 - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
Max Width: 1200px (container)
```

## 🎬 Анимации

### Timing Functions
```css
ease: cubic-bezier(0.25, 0.1, 0.25, 1)
ease-in-out: cubic-bezier(0.42, 0, 0.58, 1)
```

### Duration
```css
fast: 0.2s
normal: 0.3s
slow: 0.5s
liquid-shapes: 20-35s
```

### Commonly Used Transitions
```css
all 0.3s ease
transform 0.3s ease
color 0.3s ease
box-shadow 0.3s ease
```

## 🖼️ Border Radius

```css
small: 8px
medium: 12px
large: 16px
xlarge: 24px
xxlarge: 32px
round: 50%
pill: 24px (для badges)
```

## 📊 Layout

### Container
```css
max-width: 1200px
padding: 0 24px
margin: 0 auto
```

### Section Padding
```css
vertical: 80px
hero: 120px 0 80px
```

### Grid Gaps
```css
small: 16px
medium: 24px
large: 32px
xlarge: 64px
```

## 🎨 Использование в коде

### Применение glass эффекта
```jsx
<div className="glass-effect">
  {/* Контент */}
</div>
```

### Применение градиента к тексту
```jsx
<span className="gradient-text">Текст с градиентом</span>
```

### Создание кнопок
```jsx
<button className="btn-primary">Основная кнопка</button>
<button className="btn-secondary">Вторичная кнопка</button>
<button className="btn-outline">Кнопка с обводкой</button>
<button className="btn-primary btn-large">Большая кнопка</button>
```

## 🔗 Интеграция с системой

### Для будущих страниц
При создании новых страниц используйте:
1. Те же CSS переменные из `:root`
2. Класс `.glass-effect` для прозрачных элементов
3. Градиенты для акцентов
4. Единую систему spacing
5. Анимации из Landing.css

### Пример новой страницы
```jsx
import './Landing.css'; // Импортировать базовые стили

function NewPage() {
  return (
    <div className="container">
      <div className="glass-effect" style={{ padding: '32px' }}>
        <h2 className="section-title">Заголовок</h2>
        <p>Контент страницы</p>
        <button className="btn-primary">Действие</button>
      </div>
    </div>
  );
}
```

## 📋 Чеклист для новых компонентов

- [ ] Использовать CSS переменные для цветов
- [ ] Применять glass эффект где уместно
- [ ] Добавить hover состояния
- [ ] Обеспечить адаптивность
- [ ] Использовать единую систему spacing
- [ ] Применять плавные переходы (0.3s ease)
- [ ] Тестировать на разных размерах экрана
- [ ] Проверить accessibility (контрастность, focus states)

---

**Примечание**: Эта дизайн-система создана специально для Korastra и должна использоваться во всех компонентах приложения для поддержания единого стиля.
