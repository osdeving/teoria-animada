export type TeletypeBeat = {
  pause?: number
  text: string
}

export type LessonScene =
  | {
      charDelay?: number
      loopDelay?: number
      script: TeletypeBeat[]
      type: 'teletype'
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

const mmcScript: TeletypeBeat[] = [
  { text: '12, 18, 30', pause: 520 },
  { text: ' |', pause: 220 },
  { text: ' 2', pause: 460 },
  { text: '\n 6,  9, 15', pause: 520 },
  { text: ' |', pause: 220 },
  { text: ' 2', pause: 460 },
  { text: '\n 3,  9, 15', pause: 520 },
  { text: ' |', pause: 220 },
  { text: ' 3', pause: 460 },
  { text: '\n 1,  3,  5', pause: 520 },
  { text: ' |', pause: 220 },
  { text: ' 3', pause: 460 },
  { text: '\n 1,  1,  5', pause: 520 },
  { text: ' |', pause: 220 },
  { text: ' 5', pause: 460 },
  { text: '\n 1,  1,  1', pause: 780 },
  { text: '\n\nMMC = 2 x 2 x 3 x 3 x 5 = 180', pause: 2200 },
]

export const lessons: Lesson[] = [
  {
    id: 'mmc',
    label: 'MMC',
    scene: {
      charDelay: 54,
      loopDelay: 2200,
      script: mmcScript,
      type: 'teletype',
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
