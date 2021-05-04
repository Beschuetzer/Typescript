"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertLocation = exports.ProjectStatus = exports.Project = void 0;
class Project {
    constructor(title, description, people, status) {
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = Math.random().toString();
    }
}
exports.Project = Project;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
;
var InsertLocation;
(function (InsertLocation) {
    InsertLocation["start"] = "afterbegin";
    InsertLocation["end"] = "beforeend";
})(InsertLocation = exports.InsertLocation || (exports.InsertLocation = {}));
;
//# sourceMappingURL=project-model.js.map