"use strict";
function addWithTypeGuard(n1, n2, showResult, phrase) {
    if (typeof n1 !== 'number' || typeof n2 !== 'number') {
        throw new Error('Incorrect input!');
    }
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
function printEmployeeInformation(employee) {
    if ('privileges' in employee) {
        console.log(employee.privileges);
    }
    if ('startDate' in employee) {
        console.log('employee.startDate =', employee.startDate);
    }
}
class Car {
    drive() {
        console.log('driving');
    }
}
class Truck {
    drive() {
        console.log('driving a truck!');
    }
    loadCard() {
        console.log('loading cargo');
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
    }
}
//# sourceMappingURL=typeGuards.js.map