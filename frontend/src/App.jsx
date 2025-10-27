import React from 'react';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold">Project Management System</h1>
        <p className="mt-2 text-slate-600">Стартовая заготовка. Структура папок подготовлена.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="font-medium">components/</h2>
            <p className="text-sm text-slate-600">Повторно используемые UI-компоненты.</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="font-medium">pages/</h2>
            <p className="text-sm text-slate-600">Экраны/страницы приложения (роуты).</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="font-medium">services/</h2>
            <p className="text-sm text-slate-600">Работа с API (axios и функции запросов).</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="font-medium">context/</h2>
            <p className="text-sm text-slate-600">Глобальное состояние, например AuthContext.</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="font-medium">hooks/</h2>
            <p className="text-sm text-slate-600">Кастомные React-хуки.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
