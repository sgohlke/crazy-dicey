
export class Player {
    name: string
    public constructor(name: string) {
        this.name = name
    }

    getName(): string {
        return this.name
    }
}