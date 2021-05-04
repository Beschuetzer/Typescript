"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_input_1 = require("./components/project-input");
const project_list_1 = require("./components/project-list");
var App;
(function (App) {
    new project_input_1.ProjectInput();
    new project_list_1.ProjectList('active');
    new project_list_1.ProjectList('finished');
})(App || (App = {}));
//# sourceMappingURL=app.js.map