import { useEffect, useState } from 'react';

/**
 * useDarkMode - хук для управления темной темой
 * Автоматически сохраняет выбор в localStorage
 */
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Проверяем сохраненную тему
    const saved = localStorage.getItem('korastra-theme');
    if (saved) {
      return saved === 'dark';
    }
    // Иначе проверяем системные настройки
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark-theme');
      localStorage.setItem('korastra-theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('korastra-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return [isDark, toggleTheme];
};

export default useDarkMode;
