import { CrazyDicey, NUMBER_MUST_BE_POSITIVE_ERROR } from ".";

test("Create a CrazyDicey object with default six sides", () => {
    // Given

    // When
    const dicey = new CrazyDicey();

    // Then
    expect(dicey.diceSides).toBe(6);
});

test.each(
  [
    1, 3, 120, Number.MAX_VALUE, Number.MIN_VALUE, Number.POSITIVE_INFINITY,
  ],
)("Create a CrazyDicey object with %d sides", (sides) => {
  const dicey = new CrazyDicey(sides);
  expect(dicey.diceSides).toBe(sides);
});

test.each(
    [
      -1, Number.NEGATIVE_INFINITY, 
    ],
  )("Should not create a CrazyDicey object with %d sides and throw a fitting error", (sides) => {
    try {
        new CrazyDicey(sides);
    } catch (error) {
        expect(error).toBe(NUMBER_MUST_BE_POSITIVE_ERROR );

    }
  });

test("Should get a random number between 1 and 6 when rollDiceOnce()", () => {
    // Given
    const dicey = new CrazyDicey();

    // When
    const result = dicey.rollDiceOnce()

    // Then
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
});

describe('Test rollDice with 3 rounds', () => {
    beforeAll(() => {
        jest.spyOn(global.Math, "random").mockReturnValueOnce(0.1).mockReturnValueOnce(0.2).mockReturnValueOnce(0.4);
    });

    afterAll(() => {
        jest.restoreAllMocks()
    });
  
  
    test('Should get the fitting result array when calling rollDice()', () => {
        // Given
        const dicey = new CrazyDicey()

        // When
        const results = dicey.rollDice(3)

        // Then
        expect(results).toStrictEqual([1, 2, 3]);
    });
});

describe('Test rollDiceAndSumResults with 3 rounds', () => {
    beforeAll(() => {
        jest.spyOn(global.Math, "random").mockReturnValueOnce(0.1).mockReturnValueOnce(0.2).mockReturnValueOnce(0.4);
    });

    afterAll(() => {
        jest.restoreAllMocks()
    });
  
  
    test('Should get the fitting result array when calling rollDiceAndSumResults()', () => {
        // Given
        const dicey = new CrazyDicey()

        // When
        const result = dicey.rollDiceAndSumResults(3)

        // Then
        expect(result).toStrictEqual(6);
    });
});

describe('Test rollDice with 1 round', () => {
    beforeAll(() => {
        jest.spyOn(global.Math, "random").mockReturnValueOnce(0.1);
    });

    afterAll(() => {
        jest.restoreAllMocks()
    });
  
  
    test('Should get the fitting result array when calling rollDice() with default number of rounds', () => {
        // Given
        const dicey = new CrazyDicey()

        // When
        const result = dicey.rollDice()

        // Then
        expect(result).toStrictEqual([1]);
    });
});

test('Should get the fitting result array when calling rollDiceAndSumResults() with default number of rounds', () => {
    // Given
    const dicey = new CrazyDicey()

    // When
    const result = dicey.rollDiceAndSumResults()

    // Then
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
});


describe('Test sayGoodbye without exiting the tests', () => {
    beforeAll(() => {
        jest.spyOn(process, "exit").mockImplementation();
        jest.spyOn(console, "info").mockImplementation();
    });

    afterAll(() => {
        jest.restoreAllMocks()
    });
  
  
    test('Should call console.info when sayGoodbye() is called', () => {
        // Given
        const dicey = new CrazyDicey()

        // When
        dicey.sayGoodbye()

        // Then
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenLastCalledWith('Goodbye');
    });
});
