"use strict";
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = +price;
    }
}
function handleSubmit(e) {
    e.preventDefault();
    const price = document.querySelector("#price");
    const title = document.querySelector("#title");
    const course1 = new Course(title.value, +price.value);
    console.log('course1 =', course1);
}
const buttonValidation = document.getElementById('validation-submit');
buttonValidation.addEventListener('click', handleSubmit);
//# sourceMappingURL=Decorators_Validation.js.map