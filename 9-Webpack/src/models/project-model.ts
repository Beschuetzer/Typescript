
export class Project {
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

//Project Type
export enum ProjectStatus {Active, Finished};
export enum InsertLocation {start = 'afterbegin', end = 'beforeend'};
