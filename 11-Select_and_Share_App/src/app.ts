import axios from 'axios';

const form = document.querySelector('form') as HTMLFormElement;
const addressInput = document.querySelector('#address') as HTMLInputElement;


console.log('1-------ff---f--------------------------------------');
function searchAddressHandler (e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;
  const queryString = `address=${encodeURI(enteredAddress)}&key=${null}`;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${queryString}`).then((response) => {
    console.log('response =', response);
  }).catch((err) => {
    console.log('err =', err);
  })
}

form?.addEventListener('submit', searchAddressHandler);