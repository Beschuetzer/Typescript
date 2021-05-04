"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectItem = void 0;
const base_component_js_1 = require("./base-component.js");
const autobind_js_1 = require("../decorators/autobind.js");
const project_model_js_1 = require("../models/project-model.js");
class ProjectItem extends base_component_js_1.Component {
    constructor(hostId, project) {
        super('single-project', hostId, project_model_js_1.InsertLocation.end, project.id);
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
        event.dataTransfer.setData('text/plain', this.project.id);
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
    autobind_js_1.autoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autobind_js_1.autoBind
], ProjectItem.prototype, "dragEndHandler", null);
exports.ProjectItem = ProjectItem;
//# sourceMappingURL=project-item.js.map