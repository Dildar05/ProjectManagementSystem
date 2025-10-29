# Base Styles

Глобальные правила и переменные, которые импортируются в точке входа приложения.

## Файлы

### `global.css`
Главный файл с глобальными стилями:
- CSS Variables (цвета, тени, радиусы, переходы)
- Reset стили
- Базовые стили для HTML элементов
- Темная тема (`.dark-theme`)
- Container класс
- Стили скроллбара
- Selection стили

## Импорт

```javascript
// src/index.js
import './styles/base/global.css';
```

Импортируется **один раз** в главной точке входа приложения (`index.js`).

## CSS Variables

Все переменные доступны глобально через `var()`:

```css
/* Использование */
.my-element {
  color: var(--primary-orange);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border-radius: var(--radius-md);
}
```

## Темная тема

Переключается через класс на body:

```javascript
document.body.classList.toggle('dark-theme');
```

Все переменные автоматически переопределяются для темной темы.
