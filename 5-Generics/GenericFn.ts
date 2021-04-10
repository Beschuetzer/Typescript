//Generic types allow you to specify more type information when dealing with complex classes allowing you to access methods for those types inside ts.

//Arrays are a generic type
const names: Array<Number | String> = [];  //this is the same as c# generics

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise Resolved');
  }, 1000);
})

//for ts recognize the type of response correctly, you can't . chain the above promise declaration
promise.then(response => {
  console.log(response.split(' '))
});


//Creating a Generic Function (usually start at T)
function merge<T, U> (objA: T, objB: U) {
  //Object.assign merges the properties of each object and returns a new object with all of the properties present in all of the objects;  Note: any props with same name are overwritten by the preceding object in the function call
  //e.g. Object.assign(a, b)
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Adam'}, {age: 30});

//The generic function syntax allows you to avoid specifying the exact types being used in each call as ts does it automatically for you.
//The above is the same result as mergedObj2 where you explicitly specify the types for this call:
const mergedObj2 = merge<{name: string}, {age: number}>({name: 'Adam'}, {age: 30});


//Using type constraints (extend keyword) with generic types to tell typescript that those generic types must be of a certain type of types:
function mergeConstrained<T extends object, U extends object> (objA: T, objB: U) {
  return Object.assign(objA, objB);
}

//This will throw a compiler error
// const mergedConstrainedObj = mergeConstrained({name: 'Adam'}, 30);

interface Lengthy {
  length: number;
}

//Here T extends Lengthy, which works when passing in a string for element because .length of a string returns a number:
function countAndDescribe<T extends Lengthy> (element: T) {
  let descriptionText = 'Got no value';
  const elementCount = element.length;
  if (elementCount === 0) return descriptionText;
  return `Got ${elementCount} ${elementCount === 1 ? 'element' : 'elements'}`;
}

console.log(countAndDescribe({"length": 22}));
