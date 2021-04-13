"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const registeredValidators = {};
function setRegisteredValidator(target, propName, validatorName) {
    let validator = registeredValidators[target.constructor.name];
    let currentRegisteredValidators = {};
    let validatorsForCurrentProp = [];
    if (validator) {
        const toValidate = Object.keys(validator);
        for (let i = 0; i < toValidate.length; i++) {
            const currentPropName = toValidate[i];
            const decoratorNames = validator[currentPropName];
            currentRegisteredValidators[currentPropName] = decoratorNames;
            if (propName === currentPropName) {
                validatorsForCurrentProp.push(...decoratorNames);
            }
        }
    }
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, currentRegisteredValidators), { [propName]: [...validatorsForCurrentProp, validatorName] });
}
function Required(target, propName) {
    setRegisteredValidator(target, propName, 'required');
}
function Positive(target, propName) {
    setRegisteredValidator(target, propName, 'positive');
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig)
        return true;
    let shouldContinue = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    shouldContinue = !!obj[prop];
                    break;
                case 'positive':
                    shouldContinue = obj[prop] > 0;
                    break;
            }
            if (!shouldContinue)
                return false;
        }
    }
    return true;
}
class Course {
    constructor(title, price, tax) {
        this.title = title;
        this.price = +price;
        this.tax = +tax;
    }
}
__decorate([
    Positive
], Course.prototype, "price", void 0);
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    Positive,
    Required
], Course.prototype, "tax", void 0);
function handleSubmit(e) {
    e.preventDefault();
    const price = document.querySelector("#price");
    const title = document.querySelector("#title");
    const course1 = new Course(title.value, +price.value, 1.075);
    if (!validate(course1)) {
        console.log('invalid------------------------------------------------');
        return;
    }
    console.log('valid do something with new course------------------------------------------------');
}
const buttonValidation = document.getElementById('validation-submit');
buttonValidation.addEventListener('click', handleSubmit);
//# sourceMappingURL=Decorators_Validation.js.map