"use strict";
var user1;
user1 = {
    name: "Adam",
    age: 30,
    greet: function (msg) {
        console.log(msg);
    },
};
var user2;
user2 = {
    name: "Adam",
    age: 30,
    greet: function (msg) {
        console.log(msg);
    },
};
var Person = (function () {
    function Person(name, bioChemistry) {
        this.name = name;
        this.bioChemistry = bioChemistry;
    }
    ;
    Person.prototype.greet = function (msg) {
        console.log(msg);
    };
    return Person;
}());
var addNumbers;
var addFnInter;
addNumbers = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (last, current) {
        return last + current;
    });
};
//# sourceMappingURL=interfaces.js.map