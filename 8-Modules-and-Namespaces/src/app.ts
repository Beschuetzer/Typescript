import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js'; 
// three / is a special syntax for importing namespaces from separate files (this allows for putting things into separate files):

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
