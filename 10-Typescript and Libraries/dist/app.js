"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getInformation() {
        return [this.title, `$${this.price}`];
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], Product.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive()
], Product.prototype, "price", void 0);
const p1 = new Product('Test', -11);
class_validator_1.validate(p1).then((errors) => {
    if (errors.length > 0) {
        console.log('validation errors------------------------------------------------');
        console.log('errors =', errors);
    }
});
//# sourceMappingURL=app.js.map