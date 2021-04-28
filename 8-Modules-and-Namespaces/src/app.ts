// three / is a special syntax for importing namespaces from separate files (this allows for putting things into separate files):
/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-input.ts"/>

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
