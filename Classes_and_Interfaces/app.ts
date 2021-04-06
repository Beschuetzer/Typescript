
class Employee {
	static id = 0;
	//Shorthand initialization
	constructor(public name: string, private age: number, private readonly id?: number) {
		this.id = Employee.id++;
	}

	//Getter for age as it is private
	getAge () {
		return this.age;
	}

	//Getter for id as it is private readonly
	getId () {
		return this.id;
	}
}

class Department {
	//static properties are not accessible
	static fiscalYear = 2021;

	//public is the default
	public name: string;

	//private properties denote only accessible from inside the class in which they are defined (this is a ts thing as JS not aware of private props)
	// private employees: Employee[] = [];

	//means available in classes that extend the class in which it is defined but still 'private'
	protected employees: Employee[] = [];

	constructor(name: string, location: string) {
		this.name = name;
	}

	//typescript allows you to provide hints as to what 'this' refers to in a method adding type safety when calling
	describe(this: Department) {
		console.log('Department' + this.name);
		console.log(`Employees in ${this.name} =`, this.employees.map(e => `Name: ${e.name}, Age: ${e.getAge()} years old and id: ${e.getId()}`).join(' --- '));
	}

	addEmployees(...employees: Employee[]) {
		this.employees.push(...employees);
	}

	//creating a static method (accessed via Classname.methodName):
	getFiscalYear() {
		return Department.fiscalYear;
	}
}

class ITDepartment extends Department {
	private superSecretPassword = '123';

	//setters and getters are written like a method but accessed like a property (e.g. instance.secret)
	//great for encapsulating/adding logic when trying to read or set a property
	get secret() {
		//getters must return something
		return this.superSecretPassword;
	}

	//access using assignment (e.g. instance.secret = 'new password')
	set secret(password: string) {
		this.superSecretPassword = password;
	}

	constructor(location: string) {
		//inheriting from base class (super must be called first in constructor)
		//methods and properties are inherited
		super('IT', location);
	}

	addEmployees(...employees: Employee[]) {
		employees.forEach(employee => {
			if (employee.name === 'Andrew') return;
			else this.employees.push(employee);
		})
	}
}


const e1 = new Employee('Adam', 29);
const e2 = new Employee('Andrew', 28);
const accounting = new Department('accounting', 'gym');
const it = new ITDepartment('office');

accounting.addEmployees(e2, e1);
accounting.describe();

it.addEmployees(e1, e2);
it.describe();
it.secret = 'my new password'
console.log(it.secret)

console.log(it.getFiscalYear())


