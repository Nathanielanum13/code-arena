// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number[]}
//  */
// var twoSum = function(nums, target) {
//     if (!Array.isArray(nums)) {
//         console.error("Nums must be a valid array")
//         return
//     }

//     if (!Number.isInteger(target)) {
//         console.error("Target must be a valid array")
//         return
//     }

//     const isValidArrayLength = ((2 <= nums.length) && (nums.length <= (10 ** 4)))
//     const isValidArrayItem = nums.every(num => ((-(10 ** 9) <= num) && (num <= (10 ** 9))))
//     const isValidTarget = ((-(10 ** 9) <= target) && (target <= (10 ** 9)))

//     let final = []

//     if (isValidArrayItem, isValidArrayLength, isValidTarget) {
//         nums.forEach((num, index) => {
//             let adder = nums.filter(item => (item + num === target))[0]
//             if (adder !== undefined) {
//                 let tempFinal = [index, nums.indexOf(adder)]
//                 if (tempFinal[0] !== tempFinal[1]) {
//                     final = [index, nums.indexOf(adder)]
//                 }
//             }
//         })
//     }

//     return final
// };


/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function(word1, word2) {
    return word1.join("") === word2.join("")
};


console.log(arrayStringsAreEqual(["ab", "c"], ["ab", "c"]))