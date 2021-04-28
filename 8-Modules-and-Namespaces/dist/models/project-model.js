export class Project {
    constructor(title, description, people, status) {
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = Math.random().toString();
    }
}
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
;
export var InsertLocation;
(function (InsertLocation) {
    InsertLocation["start"] = "afterbegin";
    InsertLocation["end"] = "beforeend";
})(InsertLocation || (InsertLocation = {}));
;
//# sourceMappingURL=project-model.js.map