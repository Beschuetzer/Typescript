"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LogPropDecorator(target, propertyName) {
    console.log('property decorator------------------------------------------------');
    console.log('target =', target);
    console.log('propertyName =', propertyName);
}
class Product {
    constructor(title, _price) {
        this._price = _price;
        this.title = title;
    }
    set title(val) {
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
}
__decorate([
    LogPropDecorator
], Product.prototype, "title", null);
const p5 = new Product('apple', 5.55);
console.log('p5 =', p5);
//# sourceMappingURL=Decorator_As_Property.js.map