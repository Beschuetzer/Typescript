"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectState = exports.ProjectState = exports.State = void 0;
const project_model_1 = require("../models/project-model");
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
exports.State = State;
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
        this.projects.push(new project_model_1.Project(title, description, numOfPeople, project_model_1.ProjectStatus.Active));
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
exports.ProjectState = ProjectState;
exports.projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map