"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TodoList = ({ todos }) => {
    return (<ul>
      {todos.map(todo => {
            return (<li key={todo.id}>
            {todo.text}
          </li>);
        })}
    </ul>);
};
exports.default = TodoList;
//# sourceMappingURL=TodoList.js.map