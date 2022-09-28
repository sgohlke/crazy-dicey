export const NUMBER_MUST_BE_POSITIVE_ERROR = new Error('Number of sides should be positive')
export const ROUNDS_MUST_BE_POSITIVE_ERROR = new Error('Number of rounds should be positive')


export class CrazyDicey {
    diceSides: number

    constructor(diceSides = 6) {
        if (diceSides && diceSides > 0) {
            this.diceSides = diceSides
        } else {
            throw NUMBER_MUST_BE_POSITIVE_ERROR
        }
    }

    generateRandomDiceRoll(): number {
        const randomNumber = Math.random() * this.diceSides
        return Math.ceil(randomNumber);
    }

    rollDice(numberOfRounds = 1): Array<number> {
        const results: Array<number> = []
        for (let round = 0; round < numberOfRounds; round++) {
            results.push(this.generateRandomDiceRoll())            
        }
        return results
    }

    rollDiceAndSumResults(numberOfRounds = 1): number {
        if (numberOfRounds < 0) {
            throw ROUNDS_MUST_BE_POSITIVE_ERROR
        }

        let sum = 0
        for (let index = 0; index < numberOfRounds; index++) {
            sum += this.generateRandomDiceRoll()
        }
        return sum

    }

    rollDiceOnce(): number {
        return this.generateRandomDiceRoll()
    }

    sayGoodbye(): void {
        console.info('Goodbye')
        process.exit(0)
    }
}