import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Data for JavaScript String Methods
const stringMethods = [
  { 
    name: 'charAt()', 
    description: 'Returns the character at the specified index (position).',
    example: "'hello'.charAt(1) // returns 'e'"
  },
  { 
    name: 'charCodeAt()', 
    description: 'Returns the Unicode of the character at the specified index.',
    example: "'hello'.charCodeAt(1) // returns 101"
  },
  { 
    name: 'concat()', 
    description: 'Joins two or more strings, and returns a new joined strings.',
    example: "'Hello'.concat(' ', 'World') // returns 'Hello World'"
  },
  { 
    name: 'endsWith()', 
    description: 'Checks whether a string ends with specified string/characters.',
    example: "'Hello World'.endsWith('World') // returns true"
  },
  { 
    name: 'includes()', 
    description: 'Checks whether a string contains the specified string/characters.',
    example: "'Hello World'.includes('Hello') // returns true"
  },
  { 
    name: 'indexOf()', 
    description: 'Returns the position of the first found occurrence of a specified value in a string.',
    example: "'Hello World'.indexOf('o') // returns 4"
  },
  { 
    name: 'lastIndexOf()', 
    description: 'Returns the position of the last found occurrence of a specified value in a string.',
    example: "'Hello World'.lastIndexOf('o') // returns 7"
  },
  { 
    name: 'localeCompare()', 
    description: 'Compares two strings in the current locale.',
    example: "'a'.localeCompare('b') // returns -1"
  },
  { 
    name: 'match()', 
    description: 'Searches a string for a match against a regular expression, and returns the matches.',
    example: "'Hello'.match(/[A-Z]/g) // returns ['H']"
  },
  { 
    name: 'repeat()', 
    description: 'Returns a new string with a specified number of copies of the string it was called on.',
    example: "'ha'.repeat(3) // returns 'hahaha'"
  },
  { 
    name: 'replace()', 
    description: 'Searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced.',
    example: "'Hello'.replace('H', 'J') // returns 'Jello'"
  },
  { 
    name: 'search()', 
    description: 'Searches a string for a specified value, or regular expression, and returns the position of the match.',
    example: "'Hello'.search(/e/) // returns 1"
  },
  { 
    name: 'slice()', 
    description: 'Extracts a part of a string and returns a new string.',
    example: "'Hello World'.slice(0, 5) // returns 'Hello'"
  },
  { 
    name: 'split()', 
    description: 'Splits a string into an array of substrings.',
    example: "'Hello World'.split(' ') // returns ['Hello', 'World']"
  },
  { 
    name: 'startsWith()', 
    description: 'Checks whether a string begins with specified string/characters.',
    example: "'Hello World'.startsWith('Hello') // returns true"
  },
  { 
    name: 'substring()', 
    description: 'Extracts characters from a string, between two specified indices, and returns a new string.',
    example: "'Hello World'.substring(0, 5) // returns 'Hello'"
  },
  { 
    name: 'toLocaleLowerCase()', 
    description: 'Converts a string to lowercase letters, according to the hosts locale.',
    example: "'HELLO'.toLocaleLowerCase() // returns 'hello'"
  },
  { 
    name: 'toLocaleUpperCase()', 
    description: 'Converts a string to uppercase letters, according to the hosts locale.',
    example: "'hello'.toLocaleUpperCase() // returns 'HELLO'"
  },
  { 
    name: 'toLowerCase()', 
    description: 'Converts a string to lowercase letters.',
    example: "'HELLO'.toLowerCase() // returns 'hello'"
  },
  { 
    name: 'toString()', 
    description: 'Returns the value of a String object.',
    example: "String('hello').toString() // returns 'hello'"
  },
  { 
    name: 'toUpperCase()', 
    description: 'Converts a string to uppercase letters.',
    example: "'hello'.toUpperCase() // returns 'HELLO'"
  },
  { 
    name: 'trim()', 
    description: 'Removes whitespace from both ends of a string.',
    example: "' hello '.trim() // returns 'hello'"
  },
  { 
    name: 'valueOf()', 
    description: 'Returns the primitive value of a String object.',
    example: "String('hello').valueOf() // returns 'hello'"
  },
];

// Data for JavaScript Array Methods
const arrayMethods = [
  { 
    name: 'at()', 
    description: 'Returns an indexed element from an array.',
    example: "['a', 'b', 'c'].at(1) // returns 'b'"
  },
  { 
    name: 'concat()', 
    description: 'Joins two or more arrays, and returns a copy of the joined arrays.',
    example: "[1, 2].concat([3, 4]) // returns [1, 2, 3, 4]"
  },
  { 
    name: 'copyWithin()', 
    description: 'Copies array elements to another position in the array.',
    example: "[1, 2, 3, 4, 5].copyWithin(0, 3) // returns [4, 5, 3, 4, 5]"
  },
  { 
    name: 'entries()', 
    description: 'Returns a Key/Value Pair Array Iterator object.',
    example: "Array.from(['a', 'b'].entries()) // returns [[0, 'a'], [1, 'b']]"
  },
  { 
    name: 'every()', 
    description: 'Checks if every element in an array passes a test.',
    example: "[1, 2, 3].every(x => x < 5) // returns true"
  },
  { 
    name: 'fill()', 
    description: 'Fills the elements in an array with a static value.',
    example: "[1, 2, 3].fill(0) // returns [0, 0, 0]"
  },
  { 
    name: 'filter()', 
    description: 'Creates a new array with all elements that pass the test implemented by the provided function.',
    example: "[1, 2, 3].filter(x => x > 1) // returns [2, 3]"
  },
  { 
    name: 'find()', 
    description: 'Returns the value of the first element in an array that passes a test.',
    example: "[1, 2, 3].find(x => x > 1) // returns 2"
  },
  { 
    name: 'findIndex()', 
    description: 'Returns the index of the first element in an array that passes a test.',
    example: "[1, 2, 3].findIndex(x => x > 1) // returns 1"
  },
  { 
    name: 'flat()', 
    description: 'Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.',
    example: "[1, [2, [3]]].flat(2) // returns [1, 2, 3]"
  },
  { 
    name: 'flatMap()', 
    description: 'Maps each element using a mapping function, then flattens the result into a new array.',
    example: "[1, 2].flatMap(x => [x, x*2]) // returns [1, 2, 2, 4]"
  },
  { 
    name: 'forEach()', 
    description: 'Calls a function for each array element.',
    example: "[1, 2].forEach(x => console.log(x)) // logs 1 then 2"
  },
  { 
    name: 'from()', 
    description: 'Creates a new Array object from any object with a length property or an iterable object.',
    example: "Array.from('foo') // returns ['f', 'o', 'o']"
  },
  { 
    name: 'includes()', 
    description: 'Checks whether an array contains the specified element.',
    example: "[1, 2, 3].includes(2) // returns true"
  },
  { 
    name: 'indexOf()', 
    description: 'Searches the array for an element and returns its position.',
    example: "[1, 2, 3].indexOf(2) // returns 1"
  },
  { 
    name: 'isArray()', 
    description: 'Checks whether an object is an array.',
    example: "Array.isArray([1, 2, 3]) // returns true"
  },
  { 
    name: 'join()', 
    description: 'Joins all elements of an array into a string.',
    example: "['a', 'b', 'c'].join('-') // returns 'a-b-c'"
  },
  { 
    name: 'keys()', 
    description: 'Returns a Array Iteration Object, containing the keys of the array.',
    example: "Array.from(['a', 'b'].keys()) // returns [0, 1]"
  },
  { 
    name: 'lastIndexOf()', 
    description: 'Searches the array for an element, starting from the end, and returns its position.',
    example: "[1, 2, 3, 2].lastIndexOf(2) // returns 3"
  },
  { 
    name: 'map()', 
    description: 'Creates a new array with the results of calling a function for every array element.',
    example: "[1, 2, 3].map(x => x * 2) // returns [2, 4, 6]"
  },
  { 
    name: 'pop()', 
    description: 'Removes the last element of an array, and returns that element.',
    example: "let arr = [1, 2, 3]; arr.pop() // returns 3 and arr becomes [1, 2]"
  },
  { 
    name: 'push()', 
    description: 'Adds new elements to the end of an array, and returns the new length.',
    example: "let arr = [1, 2]; arr.push(3) // returns 3 and arr becomes [1, 2, 3]"
  },
  { 
    name: 'reduce()', 
    description: 'Reduces the array to a single value (from left-to-right).',
    example: "[1, 2, 3].reduce((acc, val) => acc + val) // returns 6"
  },
  { 
    name: 'reduceRight()', 
    description: 'Reduces the array to a single value (from right-to-left).',
    example: "['a', 'b', 'c'].reduceRight((acc, val) => acc + val) // returns 'cba'"
  },
  { 
    name: 'reverse()', 
    description: 'Reverses the order of the elements in an array.',
    example: "[1, 2, 3].reverse() // returns [3, 2, 1]"
  },
  { 
    name: 'shift()', 
    description: 'Removes the first element of an array, and returns that element.',
    example: "let arr = [1, 2, 3]; arr.shift() // returns 1 and arr becomes [2, 3]"
  },
  { 
    name: 'slice()', 
    description: 'Selects a part of an array, and returns the new array.',
    example: "[1, 2, 3, 4].slice(1, 3) // returns [2, 3]"
  },
  { 
    name: 'some()', 
    description: 'Checks if any of the elements in an array pass a test.',
    example: "[1, 2, 3].some(x => x > 2) // returns true"
  },
  { 
    name: 'sort()', 
    description: 'Sorts the elements of an array.',
    example: "[3, 1, 2].sort() // returns [1, 2, 3]"
  },
  { 
    name: 'splice()', 
    description: 'Adds/Removes elements from an array.',
    example: "let arr = [1, 2, 3]; arr.splice(1, 1, 'a') // returns [2] and arr becomes [1, 'a', 3]"
  },
  { 
    name: 'toString()', 
    description: 'Converts an array to a string, and returns the result.',
    example: "[1, 2, 3].toString() // returns '1,2,3'"
  },
  { 
    name: 'unshift()', 
    description: 'Adds new elements to the beginning of an array, and returns the new length.',
    example: "let arr = [1, 2]; arr.unshift(0) // returns 3 and arr becomes [0, 1, 2]"
  },
  { 
    name: 'valueOf()', 
    description: 'Returns the primitive value of an array.',
    example: "[1, 2, 3].valueOf() // returns [1, 2, 3]"
  },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Route for JavaScript String Methods
app.get('/strings', (req, res) => {
  res.json(stringMethods);
});

// Route for JavaScript Array Methods
app.get('/arrays', (req, res) => {
  res.json(arrayMethods);
});

// Basic health check route
app.get('/', (req, res) => {
  res.send('Server is running. Try /strings or /arrays');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes: /strings, /arrays');
});

