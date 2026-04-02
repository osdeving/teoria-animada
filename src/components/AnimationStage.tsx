import type { Lesson } from '../data/lessons'
import { assetUrl } from '../lib/assets'

type AnimationStageProps = {
  lesson: Lesson
}

export function AnimationStage({ lesson }: AnimationStageProps) {
  const isReady = lesson.scene.type === 'video'

  return (
    <section
      aria-label={lesson.title}
      aria-labelledby={`tab-${lesson.id}`}
      className="stage-panel"
      id={`panel-${lesson.id}`}
      role="tabpanel"
    >
      <div
        className={`stage-screen${isReady ? '' : ' is-placeholder'}`}
        role="presentation"
      >
        {lesson.scene.type === 'video' ? (
          <video
            aria-label={`Reproducao de ${lesson.title}`}
            autoPlay
            className="stage-video"
            controls
            loop
            muted
            playsInline
            preload="auto"
            src={assetUrl(lesson.scene.src)}
          />
        ) : (
          <pre className="stage-screen__placeholder">
            {lesson.title}
            {'\n\n'}
            {lesson.scene.message}
          </pre>
        )}
      </div>
    </section>
  )
}
