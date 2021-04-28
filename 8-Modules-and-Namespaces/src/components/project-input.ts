/// <reference path='base-component.ts'/>
namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}