//To use 3rd party JS libraries in TS, you need to install the npm package that has the type definitions:

//e.g. to use lodash, install '@types/lodash'
import _ from 'lodash';
// _.

//IF YOU CAN'T FIND TYPES FOR A LIBRARY:
//how to tell ts that something will exist
// declare const global: string;

//class-transformer (https://www.npmjs.com/package/class-transformer)
//converts (JSON) objects to instances of a class and vice-versa

//class-validator (is a TS only package) uses TS decorators to validate
//makes sure experimental decorators option in .tsconfig is enabled
import { IsNotEmpty, IsNumber, IsPositive, validate } from 'class-validator';


class Product {
  //the decorators are factories so they need to be executed
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
  
  getInformation () {
    return [this.title, `$${this.price}`];
  }
}

//using the validate method (always go to then block even if no errors)
const p1 = new Product('Test', -11);
validate(p1).then((errors) => {
  if (errors.length > 0) {
    console.log('validation errors------------------------------------------------');
    console.log('errors =', errors);
  }
}); 
