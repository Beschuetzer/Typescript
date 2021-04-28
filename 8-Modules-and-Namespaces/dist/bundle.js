"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    class Project {
        constructor(title, description, people, status) {
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
            this.id = Math.random().toString();
        }
    }
    App.Project = Project;
    //Project Type
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    ;
    let InsertLocation;
    (function (InsertLocation) {
        InsertLocation["start"] = "afterbegin";
        InsertLocation["end"] = "beforeend";
    })(InsertLocation = App.InsertLocation || (App.InsertLocation = {}));
    ;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    //Project State Management
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
            this.projects.push(new App.Project(title, description, numOfPeople, App.ProjectStatus.Active));
            this.updateListeners();
        }
        moveProject(id, newStatus) {
            const projectToMove = this.projects.find(project => project.id === id);
            if (projectToMove && newStatus !== projectToMove.status)
                projectToMove.status = newStatus;
            else
                console.log('error moving project....');
            this.updateListeners();
        }
        //tells components to re-render
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
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
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
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
    App.autoBind = autoBind;
})(App || (App = {}));
var App;
(function (App) {
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
    App.Component = Component;
})(App || (App = {}));
/// <reference path='base-component.ts'/>
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super('project-list', 'app', App.InsertLocation.end, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragLeaveHandler(event) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        dropHandler(event) {
            App.projectState.moveProject(event.dataTransfer.getData('text/plain'), this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragOverHandler(event) {
            //checking that the data can be transferred here
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                //NOTE: IN JS IT IS NECESSARY TO CALL EVENT.PREVENTDEFAULT() IN THE DRAGOVER HANDLER IN ORDER TO HAVE THE DROP HANDLER TRIGGER
                //BASICALLY JS DEFAULT BEHAVIOR IS TO PREVENT DRAG-AND-DROP
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
        }
        configure() {
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter(project => {
                    if (this.type === 'active')
                        return project.status === App.ProjectStatus.Active;
                    return project.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
            this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
            this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
            this.element.addEventListener('drop', this.dropHandler.bind(this));
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = '';
            for (const projectItem of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector('ul').id, projectItem);
            }
        }
    }
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="base-component.ts"/>
var App;
(function (App) {
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super('single-project', hostId, App.InsertLocation.end, project.id);
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
            //the 'text/plain' is just a string id for setting and retrieving said data in the drop handler on the target
            event.dataTransfer.setData('text/plain', this.project.id);
            //Allows the cursor the have a different cursor (options are copy and others)
            event.dataTransfer.effectAllowed = 'move';
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
        App.autoBind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        App.autoBind
    ], ProjectItem.prototype, "dragEndHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
/// <reference path='base-component.ts'/>
var App;
(function (App) {
    class ProjectInput extends App.Component {
        constructor() {
            super('project-input', 'app', App.InsertLocation.start, 'user-input');
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
            const titleIsValid = App.validate(titleValidatable);
            const descriptionIsValid = App.validate(descriptionValidatable);
            const peopleIsValid = App.validate(peopleValidatable);
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
                App.projectState.addProject(title, description, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        App.autoBind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
// three / is a special syntax for importing namespaces from separate files (this allows for putting things into separate files):
/// <reference path="models/drag-and-drop.ts"/>
/// <reference path="models/project-model.ts"/>
/// <reference path="state/project-state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorators/autobind.ts"/>
/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-item.ts"/>
/// <reference path="components/project-input.ts"/>
/// <reference path="components/base-component.ts"/>
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList('active');
    new App.ProjectList('finished');
})(App || (App = {}));
