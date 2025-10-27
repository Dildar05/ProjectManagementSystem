import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import AchievementsList from '../components/AchievementsList';
import XPCard from '../components/XPCard';
import Reveal from '../components/Reveal';

export default function Welcome() {
  return (
    <div className="space-y-16">
      <Hero />

      <section id="features" className="relative">
        <div className="pointer-events-none absolute -top-10 right-0 w-40 h-40 rounded-full bg-gradient-to-tr from-violet-300 to-cyan-200 opacity-30 blur-3xl" />
        <h2 className="text-2xl font-bold mb-6">Возможности</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Управление задачами"
            body="Канбан‑доски, списки, приоритеты и дедлайны — всё для эффективной работы."
            icon={<svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h12M3 17h18"/></svg>}
          />

          <FeatureCard
            title="Геймификация"
            body="XP, уровни и достижения мотивируют участников завершать задачи быстрее."
            icon={<svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-.99L12 2z"/></svg>}
          />

          <FeatureCard
            title="Аналитика"
            body="Дашборды и отчёты для оценки производительности команды и отдельных участников."
            icon={<svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6M13 17V7M17 17v-4"/></svg>}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Геймификация — как это работает</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <Reveal>
          <div className="lg:col-span-2">
            <p className="text-slate-700 mb-4">
              В ProjectXP каждая активность — создаёт ценность. За выполнение задач команда и
              участники получают XP, которые накапливаются и повышают уровень. Уровни открывают
              награды, а достижения отмечают важные вехи в работе команды.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Начисление XP</h3>
                <p className="text-slate-600">XP начисляется за создание задач, их закрытие, участие в обсуждениях и другие полезные действия.</p>
              </div>

              <div>
                <h3 className="font-semibold">Достижения</h3>
                <p className="text-slate-600">Достижения — небольшие цели, которые стимулируют регулярную активность (например: "5 задач подряд", "Командный спринт").</p>
              </div>

              <div>
                <h3 className="font-semibold">Прозрачная статистика</h3>
                <p className="text-slate-600">Аналитика позволяет увидеть вклад каждого участника, эффективность спринтов и узкие места процесса.</p>
              </div>
            </div>
          </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <XPCard level={3} current={420} goal={600} />
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Достижения команды</h4>
                <AchievementsList />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Глубже: процессы и мотивация</h2>
        <div className="prose max-w-none text-slate-700">
          <p>
            ProjectXP позволяет адаптировать систему вознаграждений под вашу команду. Настраивайте
            виды активности, которые приносят XP, создавайте командные квесты и назначайте
            бонусы за достижение ключевых результатов. Система ориентирована на позитивную мотивацию:
            прозрачную, предсказуемую и привлекательную.
          </p>

          <h3>Интеграция с процессами</h3>
          <p>
            Мы поддерживаем как классические Scrum/Kanban практики, так и гибридные сценарии. ProjectXP
            дублирует задачи в вашей доске, позволяет назначать ответственных и автоматически начислять
            XP за переходы статусов.
          </p>

          <h3>Роли и разрешения</h3>
          <p>
            Гибкая модель ролей позволяет ограничивать видимость и права для гостей, участников и менеджеров.
            Администраторы могут управлять правилами начисления XP и видеть сводную статистику.
          </p>
        </div>
      </section>

      <section className="text-center py-12 bg-grid-pattern bg-grid-sm">
        <h2 className="text-2xl font-bold mb-4">Готовы начать?</h2>
        <p className="text-slate-600 mb-6">Создайте аккаунт и начните прокачивать команду уже сегодня.</p>
        <div className="flex justify-center gap-4">
          <a className="px-6 py-3 bg-indigo-600 text-white rounded-md" href="#/register">Создать аккаунт</a>
          <a className="px-6 py-3 border rounded-md" href="#/login">Войти</a>
        </div>
      </section>
    </div>
  );
}
