
const multiply = (...numbers: number[]) => {
	return numbers.reduce((current: number, next: number) => {
		return current + next;
	})
}

console.log('multiply(3,1,2,4) =', multiply(3,1,2,4));



class Employee {
	//Shorthand initialization
	constructor(public name: string, private age: number) {}

	//Getter for age as it is private
	getAge () {
		return this.age;
	}
}

const e1 = new Employee('Adam', 29);
const e2 = new Employee('Andrew', 28);

class Department {
	//public is the default
	public name: string;

	//private properties denote only accessible from inside (this is a ts thing as JS not aware of private props)
	private employees: Employee[] = [];

	constructor(name: string) {
		this.name = name;
	}

	//typescript allows you to provide hints as to what 'this' refers to in a method adding type safety when calling
	describe(this: Department) {
		console.log('Department' + this.name);
		console.log(`Employees in ${this.name} =`, this.employees.map(e => `${e.name} (${e.getAge()})`).join(', '));
	}

	addEmployees(...employees: Employee[]) {
		this.employees.push(...employees);
	}
}

const accounting = new Department('accounting');
accounting.addEmployees(e1, e2);
accounting.describe();


