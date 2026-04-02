import { useEffect, useEffectEvent, useState } from 'react'
import type { Lesson } from '../data/lessons'
import { assetUrl } from '../lib/assets'

type AnimationStageProps = {
  lesson: Lesson
}

export function AnimationStage({ lesson }: AnimationStageProps) {
  const [previewStep, setPreviewStep] = useState(0)
  const videoSrc = lesson.asset.src ? assetUrl(lesson.asset.src) : null
  const posterSrc = lesson.asset.poster
    ? assetUrl(lesson.asset.poster)
    : undefined

  const advancePreview = useEffectEvent(() => {
    setPreviewStep((current) => (current + 1) % lesson.steps.length)
  })

  useEffect(() => {
    if (videoSrc || lesson.steps.length <= 1) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      advancePreview()
    }, 2400)

    return () => window.clearInterval(intervalId)
  }, [lesson.steps.length, videoSrc])

  return (
    <section
      aria-label={`Palco da animacao de ${lesson.title}`}
      className="stage-card"
    >
      <div className="stage-card__header">
        <div>
          <p className="stage-card__label">Preview da cena</p>
          <h3>{videoSrc ? 'Render conectado' : 'Roteiro aguardando render'}</h3>
        </div>
        <span
          className={`asset-status asset-status--${
            videoSrc ? 'video' : lesson.asset.kind
          }`}
        >
          {videoSrc ? 'video pronto' : 'pendente'}
        </span>
      </div>

      {videoSrc ? (
        <video
          className="stage-card__video"
          controls
          poster={posterSrc}
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="stage-card__placeholder">
          <div className="stage-card__toolbar">
            <span>sample: {lesson.sample}</span>
            <code>{lesson.asset.expectedPath}</code>
          </div>

          <div className="stage-card__sheet">
            <div className="stage-card__equation">{lesson.sample}</div>

            <div aria-hidden="true" className="stage-card__ghost-lines">
              <span />
              <span />
              <span />
            </div>

            <ul className="stage-card__timeline">
              {lesson.steps.map((step, index) => {
                const lineClasses = [
                  'stage-card__line',
                  index < previewStep ? 'is-complete' : '',
                  index === previewStep ? 'is-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')

                return (
                  <li className={lineClasses} key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      <div className="stage-card__notes">
        {lesson.cues.map((cue) => (
          <span key={cue}>{cue}</span>
        ))}
      </div>
    </section>
  )
}
