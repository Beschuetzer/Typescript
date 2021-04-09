"use strict";
function addWithTypeGuard(n1, n2, showResult, phrase) {
    if (typeof n1 !== 'number' || typeof n2 !== 'number') {
        throw new Error('Incorrect input!');
    }
    var result = n1 + n2;
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
var Car = (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('driving');
    };
    return Car;
}());
var Truck = (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log('driving a truck!');
    };
    Truck.prototype.loadCard = function () {
        console.log('loading cargo');
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
    }
}
//# sourceMappingURL=typeGuards.js.map