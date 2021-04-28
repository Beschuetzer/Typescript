import { Project, ProjectStatus } from '../models/project-model.js';
export class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
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
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map