import type { Lesson } from '../data/lessons'

type LessonTabsProps = {
  lessons: Lesson[]
  selectedId: string
  onSelect: (id: string) => void
}

export function LessonTabs({ lessons, selectedId, onSelect }: LessonTabsProps) {
  return (
    <div
      aria-label="Modulos de teoria animada"
      className="lesson-tabs"
      role="tablist"
    >
      {lessons.map((lesson) => {
        const isSelected = lesson.id === selectedId

        return (
          <button
            key={lesson.id}
            aria-controls={`panel-${lesson.id}`}
            aria-selected={isSelected}
            className={`lesson-tab${isSelected ? ' is-active' : ''}`}
            id={`tab-${lesson.id}`}
            onClick={() => onSelect(lesson.id)}
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            type="button"
          >
            <span className="lesson-tab__eyebrow">{lesson.shortLabel}</span>
            <strong className="lesson-tab__title">{lesson.title}</strong>
            <span className="lesson-tab__meta">{lesson.duration}</span>
          </button>
        )
      })}
    </div>
  )
}
