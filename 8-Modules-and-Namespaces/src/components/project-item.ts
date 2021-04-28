/// <reference path="base-component.ts"/>
/// <reference path="../models/project-model.ts"/>
/// <reference path="../decorators/autobind.ts"/>

namespace App {
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    
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
}