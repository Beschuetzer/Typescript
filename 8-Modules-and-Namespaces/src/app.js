"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_input_js_1 = require("./components/project-input.js");
const project_list_js_1 = require("./components/project-list.js");
var App;
(function (App) {
    new project_input_js_1.ProjectInput();
    new project_list_js_1.ProjectList('active');
    new project_list_js_1.ProjectList('finished');
})(App || (App = {}));
//# sourceMappingURL=app.js.map