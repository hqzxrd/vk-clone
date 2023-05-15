export const arrayComparison = <T>(firstArray: T[], secondArray: T[]): T[] => {
     return firstArray.filter(i => !secondArray.includes(i))
    .concat(secondArray.filter(i => !firstArray.includes(i)))
}