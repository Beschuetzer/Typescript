// three / is a special syntax for importing namespaces from separate files (this allows for putting things into separate files):
/// <reference path="models/drag-and-drop.ts"/>
/// <reference path="models/project-model.ts"/>
/// <reference path="state/project-state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorators/autobind.ts"/>
/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-item.ts"/>
/// <reference path="components/project-input.ts"/>
/// <reference path="components/base-component.ts"/>

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
