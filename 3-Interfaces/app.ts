//Interfaces describes the structure of an object
//Unlike a class this is just used as a custom type (don't need to instantiate like a class)
//used to type check an object's structure

interface PersonInterface {
	name: string;
	age: number;

	greet(msg: string): void;
}

let user1: PersonInterface;

user1 = {
	name: "Adam",
	age: 30,
	greet(msg: string) {
		console.log(msg);
	},
};

//the above is almost the same as below:
type PersonCustomType = {
	name: string;
	age: number;

	greet(msg: string): void;
};

let user2: PersonCustomType;

user2 = {
	name: "Adam",
	age: 30,
	greet(msg: string) {
		console.log(msg);
	},
};

//interfaces are usable in classes whereas custom types are not:
//interfaces force structure similar to how abstract classes do but contain no implementation details

interface Named {
	readonly name: string;

	//the '?' means it is optional (works with all method  and function parameters too)
	outputName?: string;
}

//interfaces can extend other interfaces (not limited to just one), thereby creating a new interface that requires any classes that implements the inheriting interface to implement all of the interfaces that the inheriting interface extends
interface Greetable extends Named {
	//readonly is the only modifier you can use on an interface
	greet(phrase: string): void;
}

interface IsHuman {
	readonly bioChemistry: 'human';
}

//implementing an interface within a class
//note: YOU CAN IMPLEMENT MULTIPLE INTERFACES BUT ONLY INHERIT ONE CLASS
class Person implements Greetable, IsHuman {
	constructor(public name: string, readonly bioChemistry: 'human'){};

	greet(msg: string) {
		console.log(msg);
	}
}

//function type
type AddFn = (a: number, b: number) => number;

//interfaces can by used as function types:
interface AddFnInterface {
	(a: number, b: number): number;
}

let addNumbers: AddFn;
let addFnInter: AddFnInterface;

addNumbers = (...numbers: number[]) => {
	return numbers.reduce((last, current) => {
		return last + current;
	});
}


//note: interfaces lack a JS analog as they are purely a TS construct
//note: it is recommended to use interfaces over custom types when describing the structure of objects and functions/methods