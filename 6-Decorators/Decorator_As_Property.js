"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function LogPropDecorator(target, propertyName) {
    console.log('property decorator------------------------------------------------');
    console.log('target =', target);
    console.log('propertyName =', propertyName);
}
function LogAccessor(target, name, descriptor) {
    console.log('accessor decorator------------------------------------------------');
    console.log('target =', target);
    console.log('name =', name);
    console.log('descriptor =', descriptor);
}
function LogMethod(target, name, descriptor) {
    console.log('method decorator------------------------------------------------');
    console.log('target =', target);
    console.log('name =', name);
    console.log('descriptor =', descriptor);
}
function LogParameter(target, name, position) {
    console.log('parameter decorator------------------------------------------------');
    console.log('target =', target);
    console.log('name =', name);
    console.log('position =', position);
}
function WithTemplateExecutesOnInstantiation(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                super(...args);
                setTimeout(() => {
                    console.log(Math.random());
                }, 10000 * Math.random());
            }
        };
    };
}
let Product = class Product {
    constructor(title, _price) {
        this.title = title;
        this._price = _price;
    }
    set price(val) {
        if (val > 0)
            this._price = val;
    }
    ;
    getPriceWithTax(tax) {
        if (tax < 0 || tax > 1)
            throw Error('Invalid Tax Rate!');
        return this._price * (1 + tax);
    }
};
__decorate([
    LogPropDecorator,
    LogAccessor
], Product.prototype, "price", null);
__decorate([
    LogMethod,
    __param(0, LogParameter)
], Product.prototype, "getPriceWithTax", null);
Product = __decorate([
    WithTemplateExecutesOnInstantiation('test', 'test')
], Product);
const p5 = new Product('apple', 5.55);
const p6 = new Product('orange', 7.55);
const p7 = new Product('avocados', 9.55);
console.log('p5 =', p5);
console.log('p6 =', p6);
console.log('p7 =', p7);
//# sourceMappingURL=Decorator_As_Property.js.map