import { Component } from './base-component.js';
import { ProjectItem } from './project-item.js';
import { InsertLocation, ProjectStatus } from '../models/project-model.js';
import { projectState } from '../state/project-state.js';
export class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', InsertLocation.end, `${type}-projects`);
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
        projectState.moveProject(event.dataTransfer.getData('text/plain'), this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
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
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active')
                    return project.status === ProjectStatus.Active;
                return project.status === ProjectStatus.Finished;
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
            new ProjectItem(this.element.querySelector('ul').id, projectItem);
        }
    }
}
//# sourceMappingURL=project-list.js.map