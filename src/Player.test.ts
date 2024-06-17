import { Player } from "./Player"
import { expect, test } from 'vitest'

test("Create a Player object with the correct name", () => {
    // Given/When
    const player = new Player('TestPlayer')

    // Then
    expect(player.getName()).toBe('TestPlayer')
})
