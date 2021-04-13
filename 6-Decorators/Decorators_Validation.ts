class Course {
  price: number;
  title: string;

  constructor(title:string, price: number) {
    this.title = title;
    this.price = +price;
  }
}

function handleSubmit (e) { 
  e.preventDefault();
  const price = document.querySelector("#price") as HTMLInputElement;
  const title = document.querySelector("#title") as HTMLInputElement;
  const course1 = new Course(title.value, +price.value);
  console.log('course1 =', course1);
}

const buttonValidation = document.getElementById('validation-submit') as HTMLButtonElement;
buttonValidation.addEventListener('click', handleSubmit);