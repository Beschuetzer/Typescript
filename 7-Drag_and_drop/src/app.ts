//Project Type
enum ProjectStatus {Active, Finished};
enum InsertLocation {start = 'afterbegin', end = 'beforeend'};

//Creating a function type (defining what a function signature must be)
type Listener<T> = (items: T[]) => void;

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

abstract class State <T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//Project State Management
class ProjectState extends State<Project> {
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
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

//component generic base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string, 
    hostElementId: string, 
    insertAtLocation: InsertLocation,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    
    if (newElementId) this.element.id = newElementId;
    this.attach(insertAtLocation);
  }

  private attach(insertAtLocation: InsertLocation) {
    this.hostElement.insertAdjacentElement(insertAtLocation, this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', InsertLocation.end, `${type}-projects`);
    
    this.configure();
    this.renderContent();
  }

  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
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
}

//ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  //Goal is to render form template and append it to the app 
  titleInputElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', InsertLocation.start, 'user-input')

    this.titleInputElement = document.querySelector('#title') as HTMLInputElement;
    this.descriptionElement = document.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = document.querySelector('#people') as HTMLInputElement;

    this.configure();
  }

  configure () {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {

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
}


const projectState = ProjectState.getInstance();
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');