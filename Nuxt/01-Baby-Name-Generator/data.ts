export enum Gender {
  GIRL = "Girl",
  BOY = "Boy",
  UNISEX = "Unisex",
}

export enum Popularity {
  TRENDY = "Trendy",
  UNIQUE = "Unique",
}

export enum Length {
  SHORT = "Short",
  ALL = "All",
  LONG = "Long",
}

interface Name {
    id: number;
    name: string;
    gender: Gender;
    popularuty: Popularity;
    length: Length
}


export const names: Name[] = [
    {
        id: 1,
        name: 'Nathaniel',
        gender: Gender.BOY,
        popularuty: Popularity.TRENDY,
        length: Length.LONG
    },
    {
        id: 2,
        name: 'Elsie',
        gender: Gender.GIRL,
        popularuty: Popularity.UNIQUE,
        length: Length.SHORT
    },
    {
        id: 3,
        name: 'Jesse',
        gender: Gender.BOY,
        popularuty: Popularity.UNIQUE,
        length: Length.SHORT
    },
    {
        id: 4,
        name: 'Deborah',
        gender: Gender.GIRL,
        popularuty: Popularity.UNIQUE,
        length: Length.ALL
    },
    {
        id: 5,
        name: 'Ernestina',
        gender: Gender.GIRL,
        popularuty: Popularity.TRENDY,
        length: Length.ALL
    },
    {
        id: 6,
        name: 'Abigail',
        gender: Gender.GIRL,
        popularuty: Popularity.TRENDY,
        length: Length.LONG
    },
    {
        id: 7,
        name: 'Fati',
        gender: Gender.GIRL,
        popularuty: Popularity.TRENDY,
        length: Length.SHORT
    },
    {
        id: 8,
        name: 'Opoku',
        gender: Gender.BOY,
        popularuty: Popularity.UNIQUE,
        length: Length.SHORT
    },
    {
        id: 9,
        name: 'Mabel',
        gender: Gender.GIRL,
        popularuty: Popularity.TRENDY,
        length: Length.LONG
    },
    {
        id: 10,
        name: 'Derrick',
        gender: Gender.BOY,
        popularuty: Popularity.UNIQUE,
        length: Length.ALL
    },
    {
        id: 11,
        name: 'Matey',
        gender: Gender.BOY,
        popularuty: Popularity.TRENDY,
        length: Length.LONG
    },
    {
        id: 12,
        name: 'Eve',
        gender: Gender.GIRL,
        popularuty: Popularity.UNIQUE,
        length: Length.LONG
    },
    {
        id: 13,
        name: 'Brown',
        gender: Gender.UNISEX,
        popularuty: Popularity.UNIQUE,
        length: Length.ALL
    },
    {
        id: 14,
        name: 'Daniels',
        gender: Gender.GIRL,
        popularuty: Popularity.TRENDY,
        length: Length.SHORT
    }
]