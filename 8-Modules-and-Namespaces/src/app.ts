// three / is a special syntax for importing namespaces from separate files (this allows for putting things into separate files):
/// <reference path="models/drag-and-drop.ts"/>
/// <reference path="project-model.ts"/>
/// <reference path="models/project-state.ts"/>
/// <reference path="validation.ts"/>
/// <reference path="decorators/autobind.ts"/>

namespace App {
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

  class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    
    get personsMsg(): string {
      const numberOfPeople = this.project.people;
      const suffix = 'currently assigned.';
      let personOrPeopleString = 'people';

      if (this.project.people === 1) personOrPeopleString = 'person';
      return `${numberOfPeople} ${personOrPeopleString} ${suffix}`;
    }

    constructor(private hostId: string, private project: Project) {
      super('single-project', hostId, InsertLocation.end, project.id);
      this.configure();
      this.renderContent();
    }

    @autoBind
    dragStartHandler(event: DragEvent) {
      //the 'text/plain' is just a string id for setting and retrieving said data in the drop handler on the target
      event.dataTransfer!.setData('text/plain', this.project.id);
      //Allows the cursor the have a different cursor (options are copy and others)
      event.dataTransfer!.effectAllowed = 'move'
    }

    @autoBind
    dragEndHandler(_: DragEvent) {

    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      (this.element.querySelector('h2') as HTMLElement).textContent = this.project.title;
      (this.element.querySelector('h3') as HTMLElement).textContent = this.personsMsg;
      (this.element.querySelector('p') as HTMLElement).textContent = this.project.description;
    }
  }

  //ProjectList Class
  class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

  const projectInput = new ProjectInput();
  const activeProjectList = new ProjectList('active');
  const finishedProjectList = new ProjectList('finished');
}
