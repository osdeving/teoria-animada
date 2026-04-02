import type { Lesson } from '../data/lessons'

type LessonTabsProps = {
  lessons: Lesson[]
  onSelect: (id: string) => void
  selectedId: string
}

export function LessonTabs({ lessons, onSelect, selectedId }: LessonTabsProps) {
  return (
    <aside className="lesson-nav">
      <div className="lesson-nav__brand">
        <h1>Teoria Animada</h1>
        <p>Clique e veja a operacao.</p>
      </div>

      <div
        aria-label="Modulos disponiveis"
        className="lesson-nav__list"
        role="tablist"
      >
        {lessons.map((lesson) => {
          const isSelected = lesson.id === selectedId

          return (
            <button
              key={lesson.id}
              aria-label={lesson.title}
              aria-controls={`panel-${lesson.id}`}
              aria-selected={isSelected}
              className={`lesson-tab${isSelected ? ' is-active' : ''}`}
              id={`tab-${lesson.id}`}
              onClick={() => onSelect(lesson.id)}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            >
              <span className="lesson-tab__label">{lesson.label}</span>
              <span className="lesson-tab__title">{lesson.title}</span>
              <span className={`lesson-tab__status is-${lesson.status}`}>
                {lesson.status === 'ready' ? 'pronto' : 'em preparo'}
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
