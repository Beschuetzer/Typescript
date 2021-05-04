"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectInput = void 0;
const project_model_1 = require("../models/project-model");
const autobind_1 = require("../decorators/autobind");
const base_component_1 = require("./base-component");
const validation_1 = require("../util/validation");
const project_state_1 = require("../state/project-state");
class ProjectInput extends base_component_1.Component {
    constructor() {
        super('project-input', 'app', project_model_1.InsertLocation.start, 'user-input');
        this.titleInputElement = document.querySelector('#title');
        this.descriptionElement = document.querySelector('#description');
        this.peopleInputElement = document.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
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
            maxLength: 20,
        };
        const descriptionValidatable = {
            value: description,
            inputName: 'Description',
            required: true,
            minLength: 5,
            maxLength: 100,
        };
        const peopleValidatable = {
            value: people,
            inputName: 'People',
            required: true,
            min: 1,
            max: 100,
        };
        const titleIsValid = validation_1.validate(titleValidatable);
        const descriptionIsValid = validation_1.validate(descriptionValidatable);
        const peopleIsValid = validation_1.validate(peopleValidatable);
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
            project_state_1.projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}
__decorate([
    autobind_1.autoBind
], ProjectInput.prototype, "submitHandler", null);
exports.ProjectInput = ProjectInput;
//# sourceMappingURL=project-input.js.map