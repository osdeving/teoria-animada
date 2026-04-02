import { useState } from 'react'
import './App.css'
import { AnimationStage } from './components/AnimationStage'
import { LessonTabs } from './components/LessonTabs'
import { lessons } from './data/lessons'

function App() {
  const [selectedId, setSelectedId] = useState(lessons[0]!.id)
  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedId) ?? lessons[0]!

  return (
    <div className="app-shell">
      <LessonTabs
        lessons={lessons}
        onSelect={setSelectedId}
        selectedId={selectedId}
      />

      <main className="app-stage">
        <AnimationStage key={selectedLesson.id} lesson={selectedLesson} />
      </main>
    </div>
  )
}

export default App
