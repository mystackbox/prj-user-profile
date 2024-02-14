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
    failedAttempts: {
        sunday?: number,
        monday?:number,
        tuesday?: number,
        wednesday?: number,
        thursday?: number,
        friday?: number,
        saturday?: number
    }
}
