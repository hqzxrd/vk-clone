export const arrayComparison = <T>(firstArray: T[], secondArray: T[]): T[] => {
    if(!secondArray || !secondArray.length) return firstArray
     return firstArray.filter(i => !secondArray.includes(i))
    .concat(secondArray.filter(i => !firstArray.includes(i)))
}