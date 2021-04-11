//Decorators can be added to a property in a class:

//decorator
//the 1st passed in arg is the prototype of the obj if it is an instance property and the constructor fn if it is a static prop
//the 2nd arg is the propertyName
function LogPropDecorator(target: any, propertyName: string | Symbol) {
  console.log('property decorator------------------------------------------------');
  console.log('target =', target);
  console.log('propertyName =', propertyName);
}

function LogAccessor(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('accessor decorator------------------------------------------------');
  console.log('target =', target);
  console.log('name =', name);
  console.log('descriptor =', descriptor);
}

function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('method decorator------------------------------------------------');
  console.log('target =', target);
  console.log('name =', name);
  console.log('descriptor =', descriptor);
}

function LogParameter(target: any, name: string | Symbol, position: number) {
  console.log('parameter decorator------------------------------------------------');
  console.log('target =', target);
  console.log('name =', name);
  console.log('position =', position);
}

//ALL DECORATORS EXECUTE WHEN THE CLASS IS DEFINED NOT WHEN INSTANCES ARE INSTANTIATED UNLESS YOU RETURN A NEW CLASS IN THE DECORATOR:

function WithTemplateExecutesOnInstantiation (template: string, hookId: string) {
  return function<T extends {new (...args: any[]): {}}> (originalConstructor: T) {
    return class extends originalConstructor {
      constructor (...args: any[]) {
        super(...args);
        //custom logic to run on each instantiation of the  class the deorator is used on
        setTimeout(() => {
          console.log(Math.random())
        }, 10000 * Math.random())
      }
    }
  }
}

@WithTemplateExecutesOnInstantiation('test', 'test')
class Product {
  @LogPropDecorator

  @LogAccessor
  set price(val: number) {
    if (val > 0) this._price = val;
  }

  constructor(public title: string, private _price: number){
  };

  @LogMethod
  getPriceWithTax(@LogParameter tax: number) {
    if (tax < 0 || tax > 1) throw Error('Invalid Tax Rate!');
    return this._price * (1 + tax);
  }
}

const p5 = new Product('apple', 5.55);
const p6 = new Product('orange', 7.55);
const p7 = new Product('avocados', 9.55);
console.log('p5 =', p5);
console.log('p6 =', p6);
console.log('p7 =', p7);
