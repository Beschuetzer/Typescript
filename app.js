"use strict";
var button = document.querySelector('button');
if (button) {
    button.addEventListener('click', handleClick.bind(null, 'You clicked the button'));
}
function handleClick(msg) {
    console.log(msg);
}
//# sourceMappingURL=app.js.map