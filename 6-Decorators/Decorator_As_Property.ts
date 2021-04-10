//Decorators can be added to a property in a class:

//decorator
//the 1st passed in arg is the prototype of the obj if it is an instance property and the constructor fn if it is a static prop
//the 2nd arg is the propertyName
function LogPropDecorator(target: any, propertyName: string | Symbol) {
  console.log('property decorator------------------------------------------------');
  console.log('target =', target);
  console.log('propertyName =', propertyName);
}

class Product {
  @LogPropDecorator
  set title(val: string) {
    // this.title = val;
  }
  set price(val: number) {
    if (val > 0) this._price = val;
  }

  constructor(title: string, private _price: number){
    this.title = title;
  };

  getPriceWithTax(tax: number) {
    if (tax < 0 || tax > 1) throw Error('Invalid Tax Rate!');
    return this._price * (1 + tax);
  }
}

const p5 = new Product('apple', 5.55);
console.log('p5 =', p5);