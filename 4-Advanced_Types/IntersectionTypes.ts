// allow us to combine other types
type Admin = {
  name: string;
  privileges: string[];
}

type Employee2 = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee2;

const elevated1: ElevatedEmployee = {
  name: 'Adam',
  privileges: ['create-server'],
  startDate: new Date(),
}

//with interfaces 
interface AdminInterface {
  name: string;
  privileges: string[];
}

interface EmployeeInterface {
  name: string;
  startDate: Date;
}

interface ElevatedEmployeeInterface extends AdminInterface, EmployeeInterface {};

const elevated2: ElevatedEmployeeInterface = {
  name: 'Adam',
  privileges: ['create-server'],
  startDate: new Date(),
}


//intersection types behave differently when used with custom types:
type Combinable2 = string | number;
type Number2 = boolean | number;

//& means types common to both in this case
type Universal = Number2 & Combinable2;