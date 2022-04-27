export const NUMBER_MUST_BE_POSITIVE_ERROR = new Error('Number of sides should be positive')

export class CrazyDicey {
    diceSides: number

    constructor(diceSides: number = 6) {
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

    rollDice(numberOfRounds: number = 1): Array<number> {
        const results: Array<number> = []
        for (let round = 0; round < numberOfRounds; round++) {
            results.push(this.generateRandomDiceRoll())            
        }
        return results
    }

    rollDiceAndSumResults(numberOfRounds: number = 1): number {
        const results = this.rollDice(numberOfRounds)
        return results.reduce(( previousValue, currentValue ) => previousValue + currentValue, 0)
    }


    rollDiceOnce(): number {
        return this.generateRandomDiceRoll()
    }

    sayGoodbye(): void {
        console.info('Goodbye')
        process.exit(0)
    }
}