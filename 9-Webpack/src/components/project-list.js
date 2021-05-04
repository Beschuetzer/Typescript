"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectList = void 0;
const base_component_1 = require("./base-component");
const project_item_1 = require("./project-item");
const project_model_1 = require("../models/project-model");
const project_state_1 = require("../state/project-state");
class ProjectList extends base_component_1.Component {
    constructor(type) {
        super('project-list', 'app', project_model_1.InsertLocation.end, `${type}-projects`);
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
        project_state_1.projectState.moveProject(event.dataTransfer.getData('text/plain'), this.type === 'active' ? project_model_1.ProjectStatus.Active : project_model_1.ProjectStatus.Finished);
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
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
        project_state_1.projectState.addListener((projects) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active')
                    return project.status === project_model_1.ProjectStatus.Active;
                return project.status === project_model_1.ProjectStatus.Finished;
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
            new project_item_1.ProjectItem(this.element.querySelector('ul').id, projectItem);
        }
    }
}
exports.ProjectList = ProjectList;
//# sourceMappingURL=project-list.js.map