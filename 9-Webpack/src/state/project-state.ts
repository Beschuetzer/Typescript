import { Project, ProjectStatus } from '../models/project-model';

//Creating a function type (defining what a function signature must be)
type Listener<T> = (items: T[]) => void;

export abstract class State <T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//Project State Management
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    this.projects.push(new Project(title, description, numOfPeople, ProjectStatus.Active));
    this.updateListeners();
  }

  moveProject(id: string, newStatus: ProjectStatus) {
    const projectToMove = this.projects.find(project => project.id === id);
    if (projectToMove && newStatus !== projectToMove.status) projectToMove.status = newStatus;
    else console.log('error moving project....')
    this.updateListeners();
  }

  //tells components to re-render
  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}
export const projectState = ProjectState.getInstance();