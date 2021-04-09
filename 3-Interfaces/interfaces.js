"use strict";
let user1;
user1 = {
    name: "Adam",
    age: 30,
    greet(msg) {
        console.log(msg);
    },
};
let user2;
user2 = {
    name: "Adam",
    age: 30,
    greet(msg) {
        console.log(msg);
    },
};
class Person {
    constructor(name, bioChemistry) {
        this.name = name;
        this.bioChemistry = bioChemistry;
    }
    ;
    greet(msg) {
        console.log(msg);
    }
}
let addNumbers;
let addFnInter;
addNumbers = (...numbers) => {
    return numbers.reduce((last, current) => {
        return last + current;
    });
};
//# sourceMappingURL=interfaces.js.map