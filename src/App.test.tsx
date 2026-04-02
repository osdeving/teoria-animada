import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the module list and selects MMC by default', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /teoria animada/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('tab', {
        name: /mmc por divisoes sucessivas/i,
      }),
    ).toHaveAttribute('aria-selected', 'true')

    expect(
      screen.getByRole('tabpanel', {
        name: /mmc por divisoes sucessivas/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/reproducao de mmc por divisoes sucessivas/i),
    ).toBeInTheDocument()
  })

  it('mounts the rendered manim video for mmc', () => {
    render(<App />)

    expect(
      screen.getByLabelText(/reproducao de mmc por divisoes sucessivas/i),
    ).toHaveAttribute('src', expect.stringContaining('/manim/mmc/scene.mp4'))
  })

  it('switches to a placeholder scene for modules not ready yet', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('tab', {
        name: /divisao longa/i,
      }),
    )

    expect(
      screen.getByRole('tabpanel', {
        name: /divisao longa/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/cena manim em preparo/i)).toBeInTheDocument()
  })
})
