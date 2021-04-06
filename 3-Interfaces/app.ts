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
interface Greetable {
	name: string;
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
