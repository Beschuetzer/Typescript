//are well-suited for meta-coding (helping other develops rather than the user)
//Have to enable in .tsconfig file: "experimentalDecorators": true

//in general decorators are all about classes 

//decorators are just a function you apply to a class in a certain way (usually start with capital letter)

//decorators receive arguments of variable length depending on where and how they are used (constructor: function) is the default
function Decorator(constructor: Function) {
  console.log('logging------------------------------------------------');
  console.log('constructor =', constructor);
}

//creating a decorator like this allows you to pass in args when executing the decorator
function DecoratorFactory(logString: string) {
  return function (constructor: Function) {
    console.log('logString =', logString);
  }
}

function WithTemplate(template: string, hookId: string) {
  //here '_' is used to tell ts you are aware than in arg is passed in but that you are going to use it
  return function(_: Function) {
    // const el = document.getElementById(hookId);
    // if (el) el.innerHTML = template;
  }
}

//how to invoke a decorator (DECORATORS EXECUTE WHEN THE CLASS IS DEFINED)
//decorators execute from the bottom up (opposite behavior)
//factory decorators execute top down (expected behavior)
@Decorator
@DecoratorFactory('this is passed in as arg')
@WithTemplate('Rendering something to the dom', 'paragraph')
class PersonDecorated {
  name = "Max";

  constructor() {
    console.log('creating person------------------------------------------------');
  }
}

const p1 = new PersonDecorated();


