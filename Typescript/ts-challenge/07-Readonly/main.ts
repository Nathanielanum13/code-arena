// Implement the built-in Readonly<T> generic without using it.

// Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

// For example:

interface Todo {
  title: string;
  description: string;
}

type MyReadonly<T> = { readonly [key in keyof T] : T[key] }

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

// todo.title = "Hello"; // Error: cannot reassign a readonly property
// todo.description = "barFoo"; // Error: cannot reassign a readonly property
