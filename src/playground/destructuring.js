// const person = {
//     name: 'Anthony',
//     age: 26,
//     location: {
//         city: 'DC',
//         temp: 75
//     }
// };

// const {name = 'anonymous', age} = person;

// console.log(`${name} is ${age}`);

// const {city, temp: temperature} = person.location;

// console.log(`It's ${temperature} in ${city}`);

// const book = {
//     title: 'Harry Potter',
//     author: 'JK Rowling',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'self published'} = book.publisher;

// console.log(publisherName);

const address = ["2303 14th St NW", "Washington", "DC", "20009"];

const [, city, state = "NY"] = address;

console.log(`You are in ${city}, ${state}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [coffee, , medium] = item;

console.log(`A medium ${coffee} costs ${medium}`);
