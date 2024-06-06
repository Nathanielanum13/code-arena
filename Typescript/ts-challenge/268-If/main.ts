// Implement a utils If which accepts condition C, a truthy return type T, and a falsy return type F. C is expected to be either true or false while T and F can be any type.

// For example:

type If<C extends boolean, T, U> = C extends true ? T : C extends false ? U : never

type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'