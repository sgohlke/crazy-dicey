import { CrazyDicey, NUMBER_MUST_BE_POSITIVE_ERROR, ROUNDS_MUST_BE_POSITIVE_ERROR } from "."
import { Player } from "./Player"
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'

test("Create a CrazyDicey object with default six sides", () => {
    // Given/When
    const dicey = new CrazyDicey()

    // Then
    expect(dicey.diceSides).toBe(6)
    // toBeDefined does not assume a specific result (only that the value is not undefined) and would be a "thin" quality of test
    // expect(dicey.diceSides).toBeDefined();
})

test.each(
  [
    1, 3, 120, Number.MAX_VALUE, Number.MIN_VALUE, Number.POSITIVE_INFINITY,
  ],
)("Create a CrazyDicey object with %d sides", (sides) => {
  const dicey = new CrazyDicey(sides)
  expect(dicey.diceSides).toBe(sides)
})

test.each(
    [
      -1, Number.NEGATIVE_INFINITY,
    ],
  )("Should not create a CrazyDicey object with %d sides and throw a fitting error", (sides) => {
    try {
        new CrazyDicey(sides)
    } catch (error) {
        expect(error).toBe(NUMBER_MUST_BE_POSITIVE_ERROR )
    }
  })

test("Should get a random number between 1 and 6 when rollDiceOnce()", () => {
    // Given
    const dicey = new CrazyDicey()

    // When
    const result = dicey.rollDiceOnce()

    // Then
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
})

describe('Test rollDice with 3 rounds', () => {
    beforeAll(() => {
        vi.spyOn(Math, "random").mockReturnValueOnce(0.1).mockReturnValueOnce(0.2).mockReturnValueOnce(0.4)
    })

    afterAll(() => {
        vi.restoreAllMocks()
    })
  
  
    test('Should get the fitting result array when calling rollDice()', () => {
        // Given
        const dicey = new CrazyDicey(10)

        // When
        const results = dicey.rollDice(3)

        // Then
        expect(results).toStrictEqual([1, 2, 4])
    })
})

describe('Test rollDiceAndSumResults with 3 rounds', () => {
    beforeAll(() => {
        vi.spyOn(Math, "random").mockReturnValueOnce(0.1).mockReturnValueOnce(0.2).mockReturnValueOnce(0.4)
    })

    afterAll(() => {
        vi.restoreAllMocks()
    })
  
  
    test('Should get the fitting result array when calling rollDiceAndSumResults()', () => {
        // Given
        const dicey = new CrazyDicey(10)

        // When
        const result = dicey.rollDiceAndSumResults(3)

        // Then
        expect(result).toStrictEqual(7)
    })
})

describe('Test rollDice with 1 round', () => {
    beforeAll(() => {
        vi.spyOn(Math, "random").mockReturnValueOnce(0.1)
    })

    afterAll(() => {
        vi.restoreAllMocks()
    })
  
  
    test('Should get the fitting result array when calling rollDice() with default number of rounds', () => {
        // Given
        const dicey = new CrazyDicey()

        // When
        const result = dicey.rollDice()

        // Then
        expect(result).toStrictEqual([1])
    })
})

test('Should get the fitting result array when calling rollDiceAndSumResults() with default number of rounds', () => {
    // Given
    const dicey = new CrazyDicey()

    // When
    const result = dicey.rollDiceAndSumResults()

    // Then
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
})

test('Should get a fitting error message when calling rollDiceAndSumResults() with a negative number of rounds', () => {
    // Given
    const dicey = new CrazyDicey()

    // When
    try {
        dicey.rollDiceAndSumResults(-2)
    } catch (error) {
        if (error instanceof Error) {
            expect(error.message).toBe(ROUNDS_MUST_BE_POSITIVE_ERROR.message)
        }
    }
})

describe('Test sayGoodbye without exiting the tests', () => {
    beforeAll(() => {
        vi.spyOn(process, "exit").mockImplementationOnce(() => {throw new Error('process.exit() was called')})
        vi.spyOn(console, "info")
    })

    afterAll(() => {
        vi.restoreAllMocks()
    })
  
  
    test('Should call console.info when sayGoodbye() is called', () => {
        // Given
        const dicey = new CrazyDicey()

        // When
        try {
            dicey.sayGoodbye()
        } catch (error: unknown) {
            // Then
            if (error instanceof Error) {
               expect(error.message).toBe('process.exit() was called')
            }
           
            expect(console.info).toHaveBeenCalledTimes(1)
            expect(console.info).toHaveBeenLastCalledWith('Goodbye')
            expect(process.exit).toHaveBeenCalledTimes(1)
            expect(process.exit).toHaveBeenLastCalledWith(0)
        }
    })
})

test('Will roll the dice once with a player', () => {
    // Given
    const player = new Player('Test Player')
    const dicey = new CrazyDicey(6, player)

    // When
    const result = dicey.rollDiceOnce()

    // Then
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)

    /**
     * Player is not mocked and will correctly return "Test Player". 
     * Though it is advised not to test/assert player functionality here as we want to test CrazyDicey in this test class
     *   */ 
    // expect(player.getName()).toBe('Test Player')
})
