"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
;
var InsertLocation;
(function (InsertLocation) {
    InsertLocation["start"] = "afterbegin";
    InsertLocation["end"] = "beforeend";
})(InsertLocation || (InsertLocation = {}));
;
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
class Project {
    constructor(title, description, people, status) {
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = Math.random().toString();
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        this.projects.push(new Project(title, description, numOfPeople, ProjectStatus.Active));
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
class Component {
    constructor(templateId, hostElementId, insertAtLocation, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.attach(insertAtLocation);
    }
    attach(insertAtLocation) {
        this.hostElement.insertAdjacentElement(insertAtLocation, this.element);
    }
}
class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, InsertLocation.end, project.id);
        this.hostId = hostId;
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get personsMsg() {
        const numberOfPeople = this.project.people;
        const suffix = 'currently assigned.';
        let personOrPeopleString = 'people';
        if (this.project.people === 1)
            personOrPeopleString = 'person';
        return `${numberOfPeople} ${personOrPeopleString} ${suffix}`;
    }
    dragStartHandler(event) {
        console.log('event =', event);
    }
    dragEndHandler(_) {
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.personsMsg;
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    autoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autoBind
], ProjectItem.prototype, "dragEndHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', InsertLocation.end, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragLeaveHandler(event) {
        this.element.classList.remove('droppable');
    }
    dropHandler(event) {
    }
    dragOverHandler(event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.add('droppable');
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    configure() {
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active')
                    return project.status === ProjectStatus.Active;
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragexit', this.dragLeaveHandler.bind(this));
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, projectItem);
        }
    }
}
__decorate([
    autoBind
], ProjectList.prototype, "dragOverHandler", null);
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', InsertLocation.start, 'user-input');
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
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}
__decorate([
    autoBind
], ProjectInput.prototype, "submitHandler", null);
const projectState = ProjectState.getInstance();
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
//# sourceMappingURL=app.js.map