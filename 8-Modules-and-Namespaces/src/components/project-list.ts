import { DragTarget } from '../models/drag-and-drop.js';
import { Component } from './base-component.js';
import { ProjectItem } from './project-item.js';
import { InsertLocation, Project, ProjectStatus } from '../models/project-model.js';
import { projectState } from '../state/project-state.js';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', InsertLocation.end, `${type}-projects`);
    
    this.configure();
    this.renderContent();
  }

  dragLeaveHandler (event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  dropHandler(event: DragEvent) {
    projectState.moveProject(event.dataTransfer!.getData('text/plain'), this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
  }

  dragOverHandler(event: DragEvent) {
    //checking that the data can be transferred here
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
      //NOTE: IN JS IT IS NECESSARY TO CALL EVENT.PREVENTDEFAULT() IN THE DRAGOVER HANDLER IN ORDER TO HAVE THE DROP HANDLER TRIGGER
      //BASICALLY JS DEFAULT BEHAVIOR IS TO PREVENT DRAG-AND-DROP
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === 'active') return project.status === ProjectStatus.Active;
        return project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
    this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
    this.element.addEventListener('drop', this.dropHandler.bind(this));
  }

  private renderProjects() {  
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    listEl.innerHTML = '';
    for (const projectItem of this.assignedProjects) {
      new ProjectItem((this.element.querySelector('ul') as HTMLElement).id, projectItem);
    }
  }
}