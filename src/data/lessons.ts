export type FactorizationRow = {
  left: string
  right?: string
}

export type LessonScene =
  | {
      charDelay?: number
      footer: string
      lineDrawDuration?: number
      loopDelay?: number
      rows: FactorizationRow[]
      stepPause?: number
      type: 'factorization'
    }
  | {
      message: string
      type: 'placeholder'
    }

export type Lesson = {
  id: string
  label: string
  scene: LessonScene
  status: 'ready' | 'soon'
  title: string
}

export const lessons: Lesson[] = [
  {
    id: 'mmc',
    label: 'MMC',
    scene: {
      charDelay: 58,
      footer: '2 · 2 · 3 · 3 · 5 = 180',
      lineDrawDuration: 680,
      loopDelay: 2200,
      rows: [
        { left: '12, 18, 30', right: '2' },
        { left: ' 6,  9, 15', right: '2' },
        { left: ' 3,  9, 15', right: '3' },
        { left: ' 1,  3,  5', right: '3' },
        { left: ' 1,  1,  5', right: '5' },
        { left: ' 1,  1,  1' },
      ],
      stepPause: 260,
      type: 'factorization',
    },
    status: 'ready',
    title: 'MMC por divisoes sucessivas',
  },
  {
    id: 'mdc',
    label: 'MDC',
    scene: {
      message: 'Cena em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'MDC por fatores comuns',
  },
  {
    id: 'divisao',
    label: 'Divisao',
    scene: {
      message: 'Cena em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'Divisao longa',
  },
  {
    id: 'divisores',
    label: 'Divisores',
    scene: {
      message: 'Cena em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'Numero de divisores',
  },
  {
    id: 'fracoes',
    label: 'Fracoes',
    scene: {
      message: 'Cena em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'Soma de fracoes',
  },
]
