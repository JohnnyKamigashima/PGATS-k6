// @ts-nocheck

export function arraysContemOsMesmosElementos(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }
    const sortedArr1 = arr1.slice().sort()
    const sortedArr2 = arr2.slice().sort()
    for (let i = 0;i < sortedArr1.length;i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false
        }
    }
    return true
}
