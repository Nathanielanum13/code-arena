let list = [
    {
        firstName: "Nathaniel",
        lastName: "Anum",
        cars: ['Ford', 'Toyota'],
        grades: [1, 2, 3]
    },
    {
        firstName: "Yaw",
        lastName: "Amoah",
        cars: ['Benz', 'Toyota'],
        grades: [1, 2, 3]
    }
]
let list2 = ['foo', 'bar']
function filter(arr = [], key, value) {
    // 1. Return if arr is empty
    if (!arr.length) return

    // 2. Check the type of array
    return typeof arr[0]
}

let results = filter(list2, 'foo', 'bar')
console.log(results)