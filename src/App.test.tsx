import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the landing view and default lesson', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /algoritmos de matematica ganhando ritmo/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /mmc por divisoes sucessivas/i,
      }),
    ).toBeInTheDocument()
  })

  it('switches tabs and updates the selected lesson content', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('tab', {
        name: /divisao longa com descida guiada/i,
      }),
    )

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /divisao longa com descida guiada/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('845,6 / 4')).toBeInTheDocument()
  })
})
