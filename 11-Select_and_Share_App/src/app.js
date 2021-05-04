"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form = document.querySelector('form');
const addressInput = document.querySelector('#address');
console.log('1-------ff---f--------------------------------------');
function searchAddressHandler(e) {
    e.preventDefault();
    const enteredAddress = addressInput.value;
    const queryString = `address=${encodeURI(enteredAddress)}&key=${null}`;
    axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?${queryString}`).then((response) => {
        console.log('response =', response);
    }).catch((err) => {
        console.log('err =', err);
    });
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', searchAddressHandler);
//# sourceMappingURL=app.js.map