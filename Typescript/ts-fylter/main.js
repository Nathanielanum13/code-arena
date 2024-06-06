import { Fylter } from "./dist/index.js";

let filter = new Fylter([{ id: 1, fullName: "Nathaniel Anum Adjah" }]);

let users = [
  {
    id: 1,
    firstName: "Nathaniel",
    lastName: "Anum",
    gender: "Male",
    age: 23
  },
  {
    id: 2,
    firstName: "Jerry",
    lastName: "Ford",
    gender: "Male",
    age: 21
  },
  {
    id: 3,
    firstName: "Jennifer",
    lastName: "Laryeh",
    gender: "Female",
    age: 12
  }
]

let locations = [
  {
    id: 1,
    address: "Papase, Accra Ghana",
    city: "Accra",
    postalAddress: "GW0960"
  },
  {
    id: 3,
    address: "Washington DC, London",
    city: "London",
    postalAddress: "TX0004"
  }
]

let posts = [
  {
    id: 2,
    postid: 1,
    message: "This article was really helpful"
  },
  {
    id: 1,
    postid: 2,
    message: "I really enjoyed it"
  },
  {
    id: 3,
    postid: 1,
    message: "Bad user experience, you can do better"
  }
]

filter
  .append(users)
  .append(locations)
  .append(posts)
  .groupBy(["id"])

console.log(filter.getTable());
