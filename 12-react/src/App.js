"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const TodoList_1 = __importDefault(require("./components/TodoList"));
function App() {
    const todos = [{ id: 't1', text: 'finish the course' }];
    return (<div className="App">
      <TodoList_1.default todos={todos}/>
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map