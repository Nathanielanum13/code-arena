const [firstInput, secondInput, resultInput] = [
  ...document.querySelectorAll("#first-input, #second-input, #result-input"),
];
const MIN_VALUE = 1, MAX_VALUE = 1000, MAX_NUMBER_OF_DIGIT = 4

const sum = (val, val1) => parseInt(val) + parseInt(val1)

Array.from([firstInput, secondInput]).forEach(input => {
    input.addEventListener('input', ({ target }) => {
        if (parseInt(target.value) < MIN_VALUE) {
            target.value = ''
        }
        if (parseInt(target.value) > MAX_VALUE && target.value.length <= MAX_NUMBER_OF_DIGIT) {
            target.value = target.value.slice(0, MAX_NUMBER_OF_DIGIT - 1)
        }
        if (target.value && target.value.length > MAX_NUMBER_OF_DIGIT) {
            target.value = target.value.slice(0, MAX_NUMBER_OF_DIGIT)    
        }
        resultInput.value = sum(firstInput.value || 0, secondInput.value || 0)
    })
})
