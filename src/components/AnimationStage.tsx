import { useEffect, useMemo, useState } from 'react'
import type { Lesson, LessonScene } from '../data/lessons'

type AnimationStageProps = {
  lesson: Lesson
}

type FactorizationBoardProps = {
  scene: Extract<LessonScene, { type: 'factorization' }>
}

const rowTopPositions = ['14%', '25%', '36%', '47%', '58%', '69%']

function FactorizationBoard({ scene }: FactorizationBoardProps) {
  const emptyRows = useMemo(() => scene.rows.map(() => ''), [scene.rows])
  const [leftRows, setLeftRows] = useState(emptyRows)
  const [rightRows, setRightRows] = useState(emptyRows)
  const [footer, setFooter] = useState('')
  const [showHorizontalLine, setShowHorizontalLine] = useState(false)
  const [showVerticalLine, setShowVerticalLine] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timers = new Set<number>()

    const wait = (duration: number) =>
      new Promise<void>((resolve) => {
        const timerId = window.setTimeout(() => {
          timers.delete(timerId)
          resolve()
        }, duration)

        timers.add(timerId)
      })

    const typeText = async (
      write: (value: string) => void,
      text: string,
      charDelay: number,
    ) => {
      for (let index = 0; index < text.length; index += 1) {
        if (cancelled) {
          return
        }

        write(text.slice(0, index + 1))
        await wait(charDelay)
      }
    }

    const writeRow = (
      side: 'left' | 'right',
      rowIndex: number,
      value: string,
    ) => {
      const update = (current: string[]) =>
        current.map((row, index) => (index === rowIndex ? value : row))

      if (side === 'left') {
        setLeftRows(update)
        return
      }

      setRightRows(update)
    }

    const resetBoard = () => {
      setLeftRows(emptyRows)
      setRightRows(emptyRows)
      setFooter('')
      setShowVerticalLine(false)
      setShowHorizontalLine(false)
    }

    const playScene = async () => {
      let firstCycle = true

      while (!cancelled) {
        if (!firstCycle) {
          resetBoard()
          await wait(260)
        }

        firstCycle = false

        const charDelay = scene.charDelay ?? 54
        const lineDrawDuration = scene.lineDrawDuration ?? 620
        const stepPause = scene.stepPause ?? 220

        await typeText(
          (value) => writeRow('left', 0, value),
          scene.rows[0]!.left,
          charDelay,
        )

        setShowVerticalLine(true)
        await wait(lineDrawDuration + stepPause)

        if (scene.rows[0]!.right) {
          await typeText(
            (value) => writeRow('right', 0, value),
            scene.rows[0]!.right!,
            charDelay,
          )
        }

        for (let rowIndex = 1; rowIndex < scene.rows.length; rowIndex += 1) {
          const row = scene.rows[rowIndex]!

          await wait(stepPause)
          await typeText(
            (value) => writeRow('left', rowIndex, value),
            row.left,
            charDelay,
          )

          if (row.right) {
            await wait(Math.max(120, Math.floor(stepPause / 2)))
            await typeText(
              (value) => writeRow('right', rowIndex, value),
              row.right,
              charDelay,
            )
          }
        }

        await wait(stepPause)
        setShowHorizontalLine(true)
        await wait(lineDrawDuration + stepPause)
        await typeText(setFooter, scene.footer, charDelay)
        await wait(scene.loopDelay ?? 1800)
      }
    }

    void playScene()

    return () => {
      cancelled = true
      timers.forEach((timerId) => window.clearTimeout(timerId))
      timers.clear()
    }
  }, [emptyRows, scene])

  return (
    <div className="factor-board" data-testid="factor-board">
      <div
        className={`factor-board__vertical-line${
          showVerticalLine ? ' is-drawn' : ''
        }`}
        data-testid="factor-divider-vertical"
      />

      <div
        className={`factor-board__horizontal-line${
          showHorizontalLine ? ' is-drawn' : ''
        }`}
        data-testid="factor-divider-horizontal"
      />

      {scene.rows.map((row, rowIndex) => (
        <div
          className="factor-board__row"
          key={`${row.left}-${row.right ?? 'empty'}`}
          style={{ top: rowTopPositions[rowIndex] ?? '69%' }}
        >
          <span className="factor-board__left">{leftRows[rowIndex]}</span>
          <span className="factor-board__right">{rightRows[rowIndex]}</span>
        </div>
      ))}

      <div className="factor-board__footer">{footer}</div>
    </div>
  )
}

export function AnimationStage({ lesson }: AnimationStageProps) {
  const isReady = lesson.scene.type === 'factorization'

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
          {lesson.status === 'ready' ? 'animando' : 'em preparo'}
        </span>
      </header>

      <div
        className={`stage-screen${isReady ? '' : ' is-placeholder'}`}
        role="presentation"
      >
        {lesson.scene.type === 'factorization' ? (
          <FactorizationBoard scene={lesson.scene} />
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
