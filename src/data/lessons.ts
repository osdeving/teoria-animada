export type LessonScene =
  | {
      src: string
      type: 'video'
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
      src: 'manim/mmc/scene.mp4',
      type: 'video',
    },
    status: 'ready',
    title: 'MMC por divisoes sucessivas',
  },
  {
    id: 'mdc',
    label: 'MDC',
    scene: {
      message: 'Cena Manim em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'MDC por fatores comuns',
  },
  {
    id: 'divisao',
    label: 'Divisao',
    scene: {
      message: 'Cena Manim em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'Divisao longa',
  },
  {
    id: 'divisores',
    label: 'Divisores',
    scene: {
      message: 'Cena Manim em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'Numero de divisores',
  },
  {
    id: 'fracoes',
    label: 'Fracoes',
    scene: {
      message: 'Cena Manim em preparo.',
      type: 'placeholder',
    },
    status: 'soon',
    title: 'Soma de fracoes',
  },
]
