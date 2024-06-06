interface BaseUserActions {
  canCreate: boolean;
  canDelete: boolean;
  canRead: boolean;
  canUpdate: boolean;
}

interface BaseUser {
  firstName: string;
  lastName: string;
  age: number;
}

type GetType<T> = T;

type NewUser<T, E, U extends keyof E> = T & { [P in U]: E[P] };

type NormalUser = NewUser<BaseUser, BaseUserActions, "canRead" | "canUpdate">;
type AdminUser = NewUser<
  BaseUser,
  BaseUserActions,
  "canRead" | "canCreate" | "canDelete" | "canUpdate"
>;

const normalUser: NormalUser = {
  firstName: "Nathan",
  lastName: "",
  age: 10,
  canRead: true,
  canUpdate: true,
};

const adminUser: AdminUser = {
  firstName: "Mawutor",
  lastName: "Awutseh",
  age: 30,
  canCreate: true,
  canDelete: true,
  canRead: true,
  canUpdate: true,
};

// -------------------------------------------------------

interface Todo {
  title: string;
  description: string;
}

type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

// todo.title = "Hello";
// todo.description = "barFoo";

// ---------------------------------------------------------
const getDeepValue = <
  T,
  TFirstKey extends keyof T,
  TSecondKey extends keyof T[TFirstKey]
>(
  obj: T,
  firstKey: TFirstKey,
  secondKey: TSecondKey
) => {
  return obj[firstKey][secondKey];
};

const obj = {
  gender: {
    male: "male",
    female: "female",
  },
  name: "Nathaniel",
  complexion: {
    fair: "fair",
    dark: "dark",
  },
};

const value = getDeepValue(obj, "gender", "female");

// ----------------------------------------------------------------
interface Base {
  name: string;
}
interface Teller {
  numberOfTellers: string;
}
type School = {
  headName: string;
};

type Bank = {
  managerName: string;
};

type EntityDetails<T> = T extends School
  ? T & Base
  : T extends Bank
  ? T & Teller
  : T;

const entity: EntityDetails<School> = {
    name: "Some School",
    headName: "Whys" 
} 

// --------------------------------------------------------------

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type TupleToObject<T extends readonly any[]> = {[K in keyof T[number]]: T[K]} 

type result = TupleToObject<typeof tuple>

let a = function () {
    console.log("Hi, Nathaniel")
}

let b = a

a = function () {
    console.log('Am here')
}

console.log("A", a)
console.log("B", b)