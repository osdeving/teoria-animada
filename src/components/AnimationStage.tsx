import { useEffect, useState } from 'react'
import type { Lesson, LessonScene } from '../data/lessons'

type AnimationStageProps = {
  lesson: Lesson
}

type TeletypeScreenProps = {
  scene: Extract<LessonScene, { type: 'teletype' }>
}

function TeletypeScreen({ scene }: TeletypeScreenProps) {
  const [content, setContent] = useState('')
  const [segmentIndex, setSegmentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (segmentIndex >= scene.script.length) {
      const loopTimer = window.setTimeout(() => {
        setContent('')
        setSegmentIndex(0)
        setCharIndex(0)
      }, scene.loopDelay ?? 1800)

      return () => window.clearTimeout(loopTimer)
    }

    const segment = scene.script[segmentIndex]!

    if (charIndex < segment.text.length) {
      const typingTimer = window.setTimeout(() => {
        setContent((current) => current + segment.text[charIndex]!)
        setCharIndex((current) => current + 1)
      }, scene.charDelay ?? 48)

      return () => window.clearTimeout(typingTimer)
    }

    const nextSegmentTimer = window.setTimeout(() => {
      setSegmentIndex((current) => current + 1)
      setCharIndex(0)
    }, segment.pause ?? 260)

    return () => window.clearTimeout(nextSegmentTimer)
  }, [charIndex, scene.charDelay, scene.loopDelay, scene.script, segmentIndex])

  return (
    <pre className="stage-screen__text" data-testid="teletype-screen">
      {content}
      <span aria-hidden="true" className="stage-screen__cursor">
        █
      </span>
    </pre>
  )
}

export function AnimationStage({ lesson }: AnimationStageProps) {
  const isReady = lesson.scene.type === 'teletype'

  return (
    <section
      aria-labelledby={`tab-${lesson.id}`}
      className="stage-panel"
      id={`panel-${lesson.id}`}
      role="tabpanel"
    >
      <header className="stage-panel__header">
        <h2>{lesson.title}</h2>
        <span className={`stage-panel__status is-${lesson.status}`}>
          {lesson.status === 'ready' ? 'teletype ao vivo' : 'em preparo'}
        </span>
      </header>

      <div
        className={`stage-screen${isReady ? '' : ' is-placeholder'}`}
        role="presentation"
      >
        {lesson.scene.type === 'teletype' ? (
          <TeletypeScreen scene={lesson.scene} />
        ) : (
          <pre className="stage-screen__text">
            {lesson.title}
            {'\n\n'}
            {lesson.scene.message}
          </pre>
        )}
      </div>
    </section>
  )
}
