/* 1. Filter any array of objects by providing key and value

   - Default Condition
   let arr = [{ name: 'Nathaniel', age: 35 }]   &&   let foo = [{ name: 'Nathaniel', location: 'bar', town: 'foobar' }]
   filter(arr, key = 'name', value = 'nathaniel|nath|Nath', options = { caseSensitive: true, returnAll: true, returnSome: ['name', 'age'] })
    => [{ name: 'Nathaniel', age: 35 }]

   - Multiple Conditions
   filter(arr, [{ key: 'name', value: 'Nathaniel' }, { key: 'age', value: 35 }], options = { condition: 'OR|AND|XOR' })
    => [{ name: 'Nathaniel', age: 35 }]
 
   - Expression Conditions - NB: For expressions, provide key first
   filter(arr, 'age > 35 && name = nathaniel', options = { expression: 'true' })
    => [{ name: 'Nathaniel', age: 35 }]

   - Linked arrays
   filter(arr, key = 'name', value = 'nath', options = { link: [{ arr: foo, key: 'name' }], returnSome: ['name', 'age', 'location'] })
    => [{ name: 'Nathaniel', age: 35 }]
*/
import { validate } from "./validate.js"
const filterParameters = {
    arr: [], //
    key: "",
    value: "",
    options: "",
    expression: '',
    keyValue: []
}

const filter = (filterParameters = {}) => {
    // 1. Validate function arguments
    // filterParameters.arr && validate(filterParameters.arr, 'is_array|is_not_empty')
    let value = 0
    console.log(value, validate(value, 'is_empty'))
}

const validator = (target, rules = 'is_string') => {
    // Validation Rules
    // is_string|is_not_string|is_not_null|is_null|is_integer|is_not_integer|is_bool|is_not_bool|is_array|is_not_array|is_object|is_not_object|is_empty|is_not_
}

const validateArgs = (filterParameters) => {
    // The target array is a primary parameter and must be validated at all cost
    let isValid = true
    let err = validateArgTypeArray(filterParameters.arr)
    err?.length && (isValid = isValid && false)
    outputConsoleErrors(err)

    if (filterParameters?.key || filterParameters?.key === 0 || filterParameters?.key.length === 0) {
        let err = validateArgTypeString(filterParameters.key)
        err?.length && (isValid = isValid && false)
        outputConsoleErrors(err)
    }
    if (filterParameters?.value || filterParameters?.value === 0 || filterParameters?.value.length === 0) {
        let err = validateArgTypeString(filterParameters.value)
        err?.length && (isValid = isValid && false)
        outputConsoleErrors(err)
    }
    if (filterParameters?.options || filterParameters?.options === 0 || filterParameters?.options.length === 0) {
        let err = validateArgTypeObject(filterParameters.options)
        err?.length && (isValid = isValid && false)
        outputConsoleErrors(err)
    }
    if (filterParameters?.expression || filterParameters?.expression === 0 || filterParameters?.expression.length === 0) {
        let err = validateArgTypeString(filterParameters.expression)
        err?.length && (isValid = isValid && false)
        outputConsoleErrors(err)
    }
    if (filterParameters?.keyValue || filterParameters?.keyValue === 0 || filterParameters?.keyValue.length === 0) {
        let err = validateArgTypeArray(filterParameters.keyValue)
        err?.length && (isValid = isValid && false)
        outputConsoleErrors(err)
    }
    return isValid
}

const validateArgTypeString = (arg) => {
    if (typeof arg !== "string") {
        return validationTypeError('string', typeof arg)
    }
}

const validateArgTypeArray = (arg) => {
    if (!(arg instanceof Array)) {
        return validationTypeError('array', typeof arg)
    }
}

const validateArgTypeObject = (arg) => {
    if (!(arg instanceof Object)) {
        return validationTypeError('object', typeof arg)
    }
}

const validationTypeError = (expected, actual) => `expected type "${expected}" but got "${actual}"`

const outputConsoleErrors = (err) => {
    err?.length && console.error(stackTrace(err))
}

const stackTrace = (err) => new Error(err).stack

filter(filterParameters)