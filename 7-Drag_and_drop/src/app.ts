//Project Type
enum ProjectStatus {Active, Finished};
class Project {
    id: string;
    constructor (
      public title: string, 
      public description: string, 
      public people: number, 
      public status: ProjectStatus,
    ) {
      this.id = Math.random().toString();
    }
}

//Project State Management
class ProjectState {
  private listeners: Function[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {

  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    this.projects.push(new Project(title, description, numOfPeople, ProjectStatus.Active));
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  inputName: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface Error {
  error: string | null;
}

function validate (validatableInput: Validatable): Error {
  let isValid = {error: null} as Error;
  if (validatableInput.required) {
    if (validatableInput.value.toString().trim().length === 0) return {error: `${validatableInput.inputName} is required.`} as Error;
  }
  if (
    validatableInput.minLength != null && 
    typeof validatableInput.value === 'string'
  ) {
    if (validatableInput.value.trim().length < validatableInput.minLength) return {error: `${validatableInput.value} is shorter than ${validatableInput.minLength} in ${validatableInput.inputName}!`} as Error;
  }
  if (
    validatableInput.maxLength != null && 
    typeof validatableInput.value === 'string'
  ) {
    if (validatableInput.value.trim().length > validatableInput.maxLength) return {error: `${validatableInput.value} is longer than ${validatableInput.maxLength} in ${validatableInput.inputName}!`} as Error;
  }
  if (
    validatableInput.min != null && 
    typeof validatableInput.value === 'number'
  ) {
    if (validatableInput.value < validatableInput.min) return {error: `${validatableInput.value} is shorter than ${validatableInput.min} in ${validatableInput.inputName}!`} as Error;
  }
  if (
    validatableInput.max != null && 
    typeof validatableInput.value === 'number'
  ) {
    if (validatableInput.value > validatableInput.max) return {error: `${validatableInput.value} is longer than ${validatableInput.max} in ${validatableInput.inputName}!`} as Error;
    }
  return isValid;
}

//Auto Bind Decorator
function autoBind(target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get () {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjustedDescriptor;
}

//Creating a function type (defining what a function signature must be)
type Listener = (items: Project[]) => void;

//ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.querySelector('#project-list') as HTMLTemplateElement;
    this.hostElement = document.querySelector('#app') as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === 'active') return project.status === ProjectStatus.Active;
        return project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {  
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    listEl.innerHTML = '';
    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = projectItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

//ProjectInput Class
class ProjectInput {
  //Goal is to render form template and append it to the app 
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.querySelector('#project-input') as HTMLTemplateElement;
    this.hostElement = document.querySelector('#app') as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.insert();
    
    this.titleInputElement = document.querySelector('#title') as HTMLInputElement;
    this.descriptionElement = document.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = document.querySelector('#people') as HTMLInputElement;

    this.attachListener();
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionElement.value;
    const people = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: title,
      inputName: 'Title',
      required: true,
      minLength: 5,
      maxLength: 20,
    }

    const descriptionValidatable: Validatable = {
      value: description,
      inputName: 'Description',
      required: true,
      minLength: 5,
      maxLength: 100,
    }

    const peopleValidatable: Validatable = {
      value: people,
      inputName: 'People',
      required: true,
      min: 1,
      max: 100,
    }

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

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInputs = this.gatherUserInput();
    if (Array.isArray(userInputs)) {
      const [ title, description, people ] = userInputs;
      console.log('title =', title);
      console.log('description =', description);
      console.log('people =', people);
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  private attachListener() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  
  private insert() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}


const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');