"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = (function () {
    function Employee(name, age, id) {
        this.name = name;
        this.age = age;
        this.id = id;
        this.id = Employee.id++;
    }
    Employee.prototype.getAge = function () {
        return this.age;
    };
    Employee.prototype.getId = function () {
        return this.id;
    };
    Employee.id = 0;
    return Employee;
}());
var Department = (function () {
    function Department(name, location) {
        this.location = location;
        this.employees = [];
        this.name = name;
    }
    Department.prototype.describe = function () {
        console.log('Department' + this.name);
        console.log("Employees in " + this.name + " =", this.employees.map(function (e) { return "Name: " + e.name + ", Age: " + e.getAge() + " years old and id: " + e.getId(); }).join(' --- '));
    };
    Department.prototype.addEmployees = function () {
        var _a;
        var employees = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            employees[_i] = arguments[_i];
        }
        (_a = this.employees).push.apply(_a, employees);
    };
    Department.prototype.getFiscalYear = function () {
        return Department.fiscalYear;
    };
    Department.fiscalYear = 2021;
    return Department;
}());
var AccountingDepartment = (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(location) {
        return _super.call(this, 'accounting', location) || this;
    }
    AccountingDepartment.getInstance = function (location) {
        if (this.instance)
            return this.instance;
        this.instance = new AccountingDepartment(location);
        return this.instance;
    };
    AccountingDepartment.prototype.abstractMethodExample = function () {
        return this;
    };
    return AccountingDepartment;
}(Department));
var ITDepartment = (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(location) {
        var _this = _super.call(this, 'IT', location) || this;
        _this.superSecretPassword = '123';
        return _this;
    }
    Object.defineProperty(ITDepartment.prototype, "secret", {
        get: function () {
            return this.superSecretPassword;
        },
        set: function (password) {
            this.superSecretPassword = password;
        },
        enumerable: false,
        configurable: true
    });
    ITDepartment.prototype.addEmployees = function () {
        var _this = this;
        var employees = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            employees[_i] = arguments[_i];
        }
        employees.forEach(function (employee) {
            if (employee.name === 'Andrew')
                return;
            else
                _this.employees.push(employee);
        });
    };
    ITDepartment.prototype.abstractMethodExample = function () {
        return this;
    };
    return ITDepartment;
}(Department));
var e1 = new Employee('Adam', 29);
var e2 = new Employee('Andrew', 28);
var accounting = AccountingDepartment.getInstance('gym');
var accounting2 = AccountingDepartment.getInstance('gym2');
var it = new ITDepartment('office');
accounting.addEmployees(e2, e1);
accounting.describe();
it.addEmployees(e1, e2);
it.describe();
it.secret = 'my new password';
console.log(it.secret);
console.log(it.getFiscalYear());
console.log(it.abstractMethodExample());
console.log('accounting =', accounting);
console.log('accounting2 =', accounting2);
//# sourceMappingURL=app.js.map