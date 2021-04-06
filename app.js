"use strict";
var multiply = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (current, next) {
        return current + next;
    });
};
console.log('multiply(3,1,2,4) =', multiply(3, 1, 2, 4));
var Employee = (function () {
    function Employee(name, age) {
        this.name = name;
        this.age = age;
    }
    Employee.prototype.getAge = function () {
        return this.age;
    };
    return Employee;
}());
var e1 = new Employee('Adam', 29);
var e2 = new Employee('Andrew', 28);
var Department = (function () {
    function Department(name) {
        this.employees = [];
        this.name = name;
    }
    Department.prototype.describe = function () {
        console.log('Department' + this.name);
        console.log("Employees in " + this.name + " =", this.employees.map(function (e) { return e.name + " (" + e.getAge() + ")"; }).join(', '));
    };
    Department.prototype.addEmployees = function () {
        var _a;
        var employees = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            employees[_i] = arguments[_i];
        }
        (_a = this.employees).push.apply(_a, employees);
    };
    return Department;
}());
var accounting = new Department('accounting');
accounting.addEmployees(e1, e2);
accounting.describe();
//# sourceMappingURL=app.js.map