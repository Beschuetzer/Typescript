//one type of type guard is checking if a union type parameter is one or another type then branching logic based on which type:
function addWithTypeGuard(n1: number, n2: number, showResult: boolean, phrase: string) {
  
  //note: this is the type guard
  if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    throw new Error('Incorrect input!');
  }

  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

//prop in ... type guard
type UnionTypeEmployee = Employee2 & Admin;

function printEmployeeInformation(employee: UnionTypeEmployee) {
  //using JS to check whether a property specific to one of the type exists on the parameter employee (Employee2 has a startDate prop and admin a privileges one)
  if ('privileges' in employee) {
    //we know employee is of type Admin
    console.log(employee.privileges);
  }
  if ('startDate' in employee) {
    console.log('employee.startDate =', employee.startDate);
  }
}

//instanceof type guard (only works with classes (not interfaces due to fact they are pure ts construct))
class Car {
  drive() {
    console.log('driving')
  }
}

class Truck {
  drive() {
    console.log('driving a truck!')
  }
  loadCard() {
    console.log('loading cargo')
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  //this is the type-guard
  if (vehicle instanceof Truck) {
    //...
  }
}

 

