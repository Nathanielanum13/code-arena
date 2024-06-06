const loop = (arr = [], callBack = (oldValue, newValue) => null) => {
    let oldResult = null
    let oldValue = 0
    for(let counter = 0; counter < arr.length; counter++) {
        if (oldResult) {
            oldValue = oldResult
        } else {
            oldValue = arr[counter - 1] || typeof arr[counter] === 'string' ? '' : 0 
        }
        let result = callBack(oldValue, arr[counter])
        oldResult = result
    }
    return oldResult
}

let arr = [1, 2, 3]
let sum = loop(arr, (oldValue, newValue) => oldValue * newValue)
console.log(sum)