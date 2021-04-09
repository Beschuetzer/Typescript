"use strict";
class Employee {
    constructor(name, age, id) {
        this.name = name;
        this.age = age;
        this.id = id;
        this.id = Employee.id++;
    }
    getAge() {
        return this.age;
    }
    getId() {
        return this.id;
    }
}
Employee.id = 0;
class Department {
    constructor(name, location) {
        this.location = location;
        this.employees = [];
        this.name = name;
    }
    describe() {
        console.log('Department' + this.name);
        console.log(`Employees in ${this.name} =`, this.employees.map(e => `Name: ${e.name}, Age: ${e.getAge()} years old and id: ${e.getId()}`).join(' --- '));
    }
    addEmployees(...employees) {
        this.employees.push(...employees);
    }
    getFiscalYear() {
        return Department.fiscalYear;
    }
}
Department.fiscalYear = 2021;
class AccountingDepartment extends Department {
    constructor(location) {
        super('accounting', location);
    }
    static getInstance(location) {
        if (this.instance)
            return this.instance;
        this.instance = new AccountingDepartment(location);
        return this.instance;
    }
    abstractMethodExample() {
        return this;
    }
}
class ITDepartment extends Department {
    constructor(location) {
        super('IT', location);
        this.superSecretPassword = '123';
    }
    get secret() {
        return this.superSecretPassword;
    }
    set secret(password) {
        this.superSecretPassword = password;
    }
    addEmployees(...employees) {
        employees.forEach(employee => {
            if (employee.name === 'Andrew')
                return;
            else
                this.employees.push(employee);
        });
    }
    abstractMethodExample() {
        return this;
    }
}
const e1 = new Employee('Adam', 29);
const e2 = new Employee('Andrew', 28);
const accounting = AccountingDepartment.getInstance('gym');
const accounting2 = AccountingDepartment.getInstance('gym2');
const it = new ITDepartment('office');
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
//# sourceMappingURL=classes.js.map