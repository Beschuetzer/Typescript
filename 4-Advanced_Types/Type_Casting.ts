
//when getting a dom element by element selection, ts can correctly cast the variable
const paragraph = document.querySelector('p')


//when getting a dom element by id or class, ts does not know what kind of HTMLElement it is:
const paragraph2 = document.querySelector('#paragraph');

//there are two ways to type-cast:
const usingAs = document.querySelector('#paragraph') as HTMLParagraphElement; 

const usingBrackets = <HTMLParagraphElement> document.querySelector('#paragraph'); 

//type-casting tells ts we are sure that the variable will never return null (same as using the '!' after).  

//However if we are unsure whether a dom element will return null this is the better approach:
const unsure = document.querySelector('#unsureAboutThisID');

if (unsure) {
  (unsure as HTMLInputElement).value = 'We casted then accessed the casted value!';
}
