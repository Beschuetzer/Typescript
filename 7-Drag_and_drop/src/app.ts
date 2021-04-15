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

    const titleIsValid = title.trim().length !== 0;
    const descriptionIsValid = description.trim().length !== 0;
    const peopleIsValid = people.trim().length !== 0;

    if (!titleIsValid || !descriptionIsValid || !peopleIsValid) {
      alert('Invalid Something!');
      return;
    }
    else {
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