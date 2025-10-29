# Utility Styles

Вспомогательные классы и анимации для быстрой стилизации.

## Файлы

- `helpers.css` - Утилитарные классы и анимации

## Импорт

Можно импортировать глобально или в конкретных компонентах:

```javascript
// Глобально в index.js
import './styles/utilities/helpers.css';

// Или локально в компоненте
import '../styles/utilities/helpers.css';
```

## Категории

### Spacing (Отступы)
```css
.mt-1, .mt-2, .mt-3, .mt-4, .mt-5  /* margin-top */
.mb-1, .mb-2, .mb-3, .mb-4, .mb-5  /* margin-bottom */
.pt-1, .pt-2, .pt-3, .pt-4, .pt-5  /* padding-top */
.pb-1, .pb-2, .pb-3, .pb-4, .pb-5  /* padding-bottom */
```

### Text
```css
.text-center, .text-left, .text-right
.text-small, .text-normal, .text-large, .text-xl, .text-2xl
.text-bold, .text-semibold, .text-medium
.text-primary, .text-secondary, .text-light, .text-orange
```

### Display & Flex
```css
.flex, .flex-column, .flex-center, .flex-between, .flex-wrap
.gap-1, .gap-2, .gap-3
.grid, .grid-2, .grid-3, .grid-4
.hidden, .block, .inline-block
```

### Sizing
```css
.w-full, .h-full, .max-w-screen
```

### Border & Shadow
```css
.rounded-sm, .rounded, .rounded-lg, .rounded-xl, .rounded-full
.shadow-sm, .shadow, .shadow-lg
```

### Animations
```css
/* Готовые анимации */
.animate-fadeIn
.animate-slideUp, .animate-slideDown
.animate-slideLeft, .animate-slideRight
.animate-scaleIn
.animate-rotate
.animate-pulse
.animate-bounce
```

### Hover Effects
```css
.hover-lift      /* Поднятие при наведении */
.hover-scale     /* Увеличение при наведении */
.hover-opacity   /* Прозрачность при наведении */
```

### Responsive
```css
.mobile-hidden, .mobile-flex, .mobile-block, .mobile-text-center
.desktop-hidden
```

## Использование

```jsx
<div className="flex flex-center gap-2 mt-3">
  <button className="rounded-lg shadow hover-lift">
    Click me
  </button>
</div>

<div className="animate-fadeIn text-center">
  <h2 className="text-2xl text-bold mb-2">Title</h2>
  <p className="text-secondary">Description</p>
</div>
```

## Keyframes

Все анимации определены через `@keyframes`:
- `fadeIn` - Появление
- `slideUp/Down/Left/Right` - Скольжение
- `scaleIn` - Масштабирование
- `rotate` - Вращение
- `pulse` - Пульсация
- `bounce` - Подпрыгивание

## Расширение

Добавляйте новые утилиты по мере необходимости:

```css
/* helpers.css */
.custom-utility {
  /* Ваши стили */
}
```

## Tailwind vs Custom Utilities

Если вы используете Tailwind CSS, многие из этих утилит уже встроены. Используйте кастомные утилиты для:
- Специфичных анимаций проекта
- Комплексных hover эффектов
- Стилей, которые не покрывает Tailwind
