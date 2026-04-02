import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

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
      screen.getByRole('heading', {
        level: 2,
        name: /mmc por divisoes sucessivas/i,
      }),
    ).toBeInTheDocument()
  })

  it('draws the MMC table with a real divider line', async () => {
    vi.useFakeTimers()

    render(<App />)

    for (let step = 0; step < 16; step += 1) {
      await act(async () => {
        await vi.runOnlyPendingTimersAsync()
      })
    }

    expect(screen.getByText('12, 18, 30')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByTestId('factor-divider-vertical')).toHaveClass(
      'is-drawn',
    )
  })

  it('switches to a placeholder scene for modules not ready yet', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('tab', {
        name: /divisao longa/i,
      }),
    )

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /divisao longa/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/cena em preparo/i)).toBeInTheDocument()
  })
})
