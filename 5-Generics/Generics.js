"use strict";
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise Resolved');
    }, 1000);
});
promise.then(response => {
    console.log(response.split(' '));
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Adam' }, { age: 30 });
const mergedObj2 = merge({ name: 'Adam' }, { age: 30 });
function mergeConstrained(objA, objB) {
    return Object.assign(objA, objB);
}
function countAndDescribe(element) {
    let descriptionText = 'Got no value';
    const elementCount = element.length;
    if (elementCount === 0)
        return descriptionText;
    return `Got ${elementCount} ${elementCount === 1 ? 'element' : 'elements'}`;
}
console.log(countAndDescribe({ 'Test': "test" }));
//# sourceMappingURL=Generics.js.map