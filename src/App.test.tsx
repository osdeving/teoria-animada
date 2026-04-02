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

  it('types the MMC operation in teletype mode', async () => {
    vi.useFakeTimers()

    render(<App />)

    for (let step = 0; step < 24; step += 1) {
      await act(async () => {
        await vi.runOnlyPendingTimersAsync()
      })
    }

    expect(screen.getByTestId('teletype-screen')).toHaveTextContent(
      /12, 18, 30 \| 2/,
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
