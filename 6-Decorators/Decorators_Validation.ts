//NOTe: this is naive example of what the npm package 'class validator' does with decorators

//NOTE: Checkout https://www.udemy.com/course/understanding-typescript/learn/lecture/16935748#overview to view nest.js and typescript validator packages and frameworks that use decorators


//NOTE: the interface, validate2, and decorator code would be stored separately from the class declaration
//Creating an interface called ValidatorConfig which is used to setup the validators
interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[], //['required', 'positive']
  }
}

//Create a new instance of ValidatorConfig
const registeredValidators: ValidatorConfig = {};

//storing the validatable properties for each property in registeredValidators
function setRegisteredValidator(target: any, propName: string, validatorName: string) {
  let validator = registeredValidators[target.constructor.name];
  let validatorsForCurrentProp: string[] = [];

  if (validator) {
    const toValidate2 = Object.keys(validator);
    for (let i = 0; i < toValidate2.length; i++) {
      const currentPropName = toValidate2[i];
      const decoratorNames = validator[currentPropName];

      if (propName === currentPropName) {
        validatorsForCurrentProp.push(...decoratorNames);
      }
    }
  }

  const currentRegisteredValidators = registeredValidators[target.constructor.name];
  registeredValidators[target.constructor.name] = {
      //propName is the property name of the decorator
      //NOTE: we would want to get all of the previously registered validator properties rather than just assign 'required' (i.e. [...previousProps, 'required'] rather than below)
      ...currentRegisteredValidators,
      [propName]: [...validatorsForCurrentProp, validatorName],
  }
}

//A decorator signifying a property is required
function Required(target: any, propName: string) {
  setRegisteredValidator(target, propName, 'required');
  
}

function Positive(target: any, propName: string) {
  setRegisteredValidator(target, propName, 'positive');
}

//NOTE: this function is called every time a new instance is created for validating it based on the decorators present in the class blueprint
function validate2(obj: any) {
  //goes through each validator and runs logic based on those validators
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  
  let shouldContinue = true;
  for (const prop in objValidatorConfig) {
    //accessing all propNames for which there may be a validator
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          shouldContinue = !!obj[prop];
          break;
        case 'positive':
          shouldContinue = obj[prop] > 0;
          break;
      }
      if (!shouldContinue) return false;
    }
  }
  return true;
}

class Course {
  //number must be positive
  @Positive
  price: number;

  //title must be specified (not "")
  @Required
  title: string;

  //tax must be greater than 0 and specified
  @Positive
  @Required
  tax: number;

  constructor(title:string, price: number, tax: number) {
    this.title = title;
    this.price = +price;
    this.tax = +tax;
  }
}

function handleSubmit (e: Event) { 
  e.preventDefault();
  const price = document.querySelector("#price") as HTMLInputElement;
  const title = document.querySelector("#title") as HTMLInputElement;
  const course1 = new Course(title.value, +price.value, 1.075);
  if (!validate2(course1)) {
    console.log('invalid------------------------------------------------');
    return;
  }
  console.log('valid do something with new course------------------------------------------------');
}


const buttonValidation = document.getElementById('validation-submit') as HTMLButtonElement;
buttonValidation.addEventListener('click', handleSubmit);




