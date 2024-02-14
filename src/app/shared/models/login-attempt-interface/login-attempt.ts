export interface ILoginAttempt {
    userId: number,
    passedAttempts: {
        sunday?: number,
        monday?:number,
        tuesday?: number,
        wednesday?: number,
        thursday?: number,
        friday?: number,
        saturday?: number
    },
    failedAttemps: {
        sunday?: number,
        monday?:number,
        tuesday?: number,
        wednesday?: number,
        thursday?: number,
        friday?: number,
        saturday?: number
    }
}
