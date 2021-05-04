"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(templateId, hostElementId, insertAtLocation, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.attach(insertAtLocation);
    }
    attach(insertAtLocation) {
        this.hostElement.insertAdjacentElement(insertAtLocation, this.element);
    }
}
exports.Component = Component;
//# sourceMappingURL=base-component.js.map