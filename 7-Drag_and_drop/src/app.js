"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = { error: null };
    if (validatableInput.required) {
        if (validatableInput.value.toString().trim().length === 0)
            return { error: `${validatableInput.inputName} is required.` };
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        if (validatableInput.value.trim().length < validatableInput.minLength)
            return { error: `${validatableInput.value} is shorter than ${validatableInput.minLength} in ${validatableInput.inputName}!` };
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        if (validatableInput.value.trim().length > validatableInput.maxLength)
            return { error: `${validatableInput.value} is longer than ${validatableInput.maxLength} in ${validatableInput.inputName}!` };
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        if (validatableInput.value < validatableInput.min)
            return { error: `${validatableInput.value} is shorter than ${validatableInput.min} in ${validatableInput.inputName}!` };
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        if (validatableInput.value > validatableInput.max)
            return { error: `${validatableInput.value} is longer than ${validatableInput.max} in ${validatableInput.inputName}!` };
    }
    return isValid;
}
function autoBind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.querySelector('#project-input');
        this.hostElement = document.querySelector('#app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.insert();
        this.titleInputElement = document.querySelector('#title');
        this.descriptionElement = document.querySelector('#description');
        this.peopleInputElement = document.querySelector('#people');
        this.attachListener();
    }
    gatherUserInput() {
        const title = this.titleInputElement.value;
        const description = this.descriptionElement.value;
        const people = this.peopleInputElement.value;
        const titleValidatable = {
            value: title,
            inputName: 'Title',
            required: true,
            minLength: 5,
            maxLength: 10,
        };
        const descriptionValidatable = {
            value: description,
            inputName: 'Description',
            required: true,
            minLength: 5,
            maxLength: 10,
        };
        const peopleValidatable = {
            value: people,
            inputName: 'People',
            required: true,
            min: 1,
            max: 8,
        };
        const titleIsValid = validate(titleValidatable);
        const descriptionIsValid = validate(descriptionValidatable);
        const peopleIsValid = validate(peopleValidatable);
        let shouldSumbit = true;
        if (titleIsValid.error) {
            alert(titleIsValid.error);
            shouldSumbit = false;
        }
        if (descriptionIsValid.error) {
            alert(descriptionIsValid.error);
            shouldSumbit = false;
        }
        if (peopleIsValid.error) {
            alert(peopleIsValid.error);
            shouldSumbit = false;
        }
        if (shouldSumbit) {
            return [title, description, +people];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(e) {
        e.preventDefault();
        const userInputs = this.gatherUserInput();
        if (Array.isArray(userInputs)) {
            const [title, description, people] = userInputs;
            console.log('title =', title);
            console.log('description =', description);
            console.log('people =', people);
            this.clearInputs();
        }
    }
    attachListener() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    insert() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    autoBind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map