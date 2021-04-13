"use strict";
const obj = {
    prop1: 1,
    prop2: 2,
};
const array = [
    10, 2, 3, 40
];
console.log('for in obj-------------------');
for (const prop in obj) {
    console.log('prop =', prop);
}
console.log('for in array-------------------');
for (const prop in array) {
    console.log('prop =', prop);
}
console.log('for of array-------------------');
for (const prop of array) {
    console.log('prop =', prop);
}
//# sourceMappingURL=playground.js.map