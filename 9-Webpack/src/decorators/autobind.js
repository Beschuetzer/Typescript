"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoBind = void 0;
function autoBind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}
exports.autoBind = autoBind;
//# sourceMappingURL=autobind.js.map