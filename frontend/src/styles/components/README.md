# Component Styles

Стили для переиспользуемых компонентов приложения.

## Файлы

- `Header.css` - Навигационный хедер
- `Footer.css` - Футер сайта
- `ScrollReveal.css` - Анимации появления элементов
- `ThemeToggle.css` - Переключатель светлой/темной темы
- `AnimatedCounter.css` - Анимированные счетчики
- `ImagePlaceholder.css` - SVG плейсхолдеры для изображений

## Импорт

Каждый компонент импортирует свои стили:

```javascript
// В компоненте Header.jsx
import '../styles/components/Header.css';
```

## Рекомендации

1. **Один компонент = один CSS файл** - держите стили изолированными
2. **Используйте CSS переменные** - не дублируйте значения цветов/теней
3. **Поддержка темной темы** - добавляйте стили для `.dark-theme`
4. **Избегайте глобальных селекторов** - используйте уникальные классы

## Пример структуры

```css
/* Component.css */
.component-name {
  /* Базовые стили */
  padding: 16px;
  background: var(--glass-bg);
  border-radius: var(--radius-md);
}

/* Темная тема */
.dark-theme .component-name {
  background: rgba(255, 255, 255, 0.1);
}

/* Модификаторы */
.component-name.active {
  border-color: var(--primary-orange);
}

/* Вложенные элементы */
.component-name__title {
  font-size: 20px;
  font-weight: 700;
}

/* Адаптивность */
@media (max-width: 768px) {
  .component-name {
    padding: 12px;
  }
}
```

## CSS Modules (опционально)

Для изоляции стилей можно использовать CSS Modules:

```javascript
// Component.module.css
import styles from '../styles/components/Component.module.css';

<div className={styles.componentName}>
  <h2 className={styles.title}>Title</h2>
</div>
```
