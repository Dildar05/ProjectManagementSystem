# Styles Migration Guide

## ✅ Completed Migration

Все стили успешно перенесены в централизованную структуру `src/styles/`.

## 📁 New Structure

```
src/styles/
├── base/
│   ├── global.css          # CSS Variables, reset, базовые стили
│   └── README.md
├── components/
│   ├── AnimatedCounter.css
│   ├── Footer.css
│   ├── Header.css
│   ├── ImagePlaceholder.css
│   ├── ScrollReveal.css
│   ├── ThemeToggle.css
│   └── README.md
├── pages/
│   ├── Landing.css
│   └── README.md
├── utilities/
│   ├── helpers.css         # Утилитарные классы и анимации
│   └── README.md
└── README.md               # Главная документация
```

## 🔄 Updated Imports

### Global Styles (index.js)
```javascript
import './index.css';
import './styles/base/global.css';
```

### Page Imports (pages/Landing.jsx)
```javascript
import '../styles/pages/Landing.css';
```

### Component Imports
```javascript
// Header.jsx, Footer.jsx, etc.
import '../styles/components/Header.css';
import '../styles/components/Footer.css';
import '../styles/components/ScrollReveal.css';
import '../styles/components/ThemeToggle.css';
import '../styles/components/AnimatedCounter.css';
import '../styles/components/ImagePlaceholder.css';
```

## 🎨 CSS Variables Available

Все переменные из `global.css` доступны глобально:

```css
/* Colors */
var(--primary-orange)
var(--secondary-orange)
var(--dark-bg)
var(--light-bg)

/* Text */
var(--text-primary)
var(--text-secondary)
var(--text-light)

/* Gradients */
var(--gradient-orange)
var(--gradient-blue)

/* Glass */
var(--glass-bg)
var(--glass-border)

/* Shadows */
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)

/* Border Radius */
var(--radius-sm)    /* 8px */
var(--radius-md)    /* 12px */
var(--radius-lg)    /* 16px */
var(--radius-xl)    /* 24px */

/* Transitions */
var(--transition-fast)    /* 0.2s ease */
var(--transition-normal)  /* 0.3s ease */
var(--transition-slow)    /* 0.4s ease */
```

## 🌙 Dark Theme

Темная тема работает через класс `.dark-theme` на body:

```javascript
// Toggle
document.body.classList.toggle('dark-theme');

// Check
const isDark = document.body.classList.contains('dark-theme');
```

Все переменные автоматически переопределяются для темной темы в `global.css`.

## 🛠️ Adding New Styles

### New Component
1. Create `styles/components/YourComponent.css`
2. Import in component:
   ```javascript
   import '../styles/components/YourComponent.css';
   ```
3. Use CSS variables and `.dark-theme` support

### New Page
1. Create `styles/pages/YourPage.css`
2. Import in page:
   ```javascript
   import '../styles/pages/YourPage.css';
   ```

### New Utility
Add to `styles/utilities/helpers.css`:
```css
.your-utility {
  /* styles */
}
```

## 📚 Documentation

Each folder has its own README.md:
- `styles/README.md` - Main documentation
- `styles/base/README.md` - Global styles info
- `styles/components/README.md` - Component patterns
- `styles/pages/README.md` - Page styles guide
- `styles/utilities/README.md` - Utility classes reference

## ✨ Benefits

1. **Organized** - Clear separation of concerns
2. **Scalable** - Easy to add new styles
3. **Maintainable** - One file per component
4. **Reusable** - CSS variables everywhere
5. **Documented** - README in each folder
6. **Dark theme** - Built-in support

## 🚀 Next Steps

1. Consider using CSS Modules for better isolation:
   ```javascript
   // Component.module.css
   import styles from '../styles/components/Component.module.css';
   ```

2. Add more utility classes as needed in `utilities/helpers.css`

3. Create theme variants if needed (not just dark/light)

4. Consider adding a CSS preprocessor (SASS/LESS) for variables and mixins

## 📝 Notes

- Old CSS files removed from `src/components/` and `src/pages/`
- All imports updated
- No breaking changes - everything works as before
- CSS Variables make theming easier
- Utility classes available for rapid styling
