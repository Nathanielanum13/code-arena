// Implement the JavaScript Array.includes function in the type system. A type takes the two arguments. The output should be a boolean true or false.

// For example:

// type Includes<T extends any[], U> = {[Counter in keyof T] : T[Counter] extends U ? true : false}
type Includes<T extends any[], U extends string | keyof T> = T["includes"] extends U ? true : false

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`

