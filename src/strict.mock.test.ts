import { CrazyDicey } from "."
import { Player } from "./Player"
import { expect, test, vi } from 'vitest'

vi.mock("./Player")

test('Will roll the dice once with a strictly mocked player', () => {
    // Given
    const player = new Player('Test Player')
    const dicey = new CrazyDicey(6, player)

    // When
    const result = dicey.rollDiceOnce()

    // Then
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
    // Player is mocked so getName will always return undefined ()
    expect(player.getName()).toBe(undefined)
})
