//inside of Autobind decorator's getter, 'this' refers to the instance that has the method you are applying the decorator to:
function Autobind (target: any, methodName: string | Symbol | number, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const adjustedDescriptor = {
    configurable: true,
    enumerable: false,

    //NOTE: the getter is doing the work of automatically binding the 'this' keyword
    get () {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjustedDescriptor;
}


class Printer {
  message = 'This work!';

  @Autobind
  printMessage () {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.querySelector('button') as HTMLButtonElement;


//Whenever you setup a function as the callback for an event listener, the 'this' keyword is automatically bound to the target of the event (e.g. the button you click).  In order to change all instances of 'this' in the callback, use '.bind(objName)':
// button.addEventListener('click', printer.printMessage.bind(printer));

button.addEventListener('click', printer.printMessage);



//Decorators can be 

