//Discriminated Union TypeGuarding (Add a property to each object/interface/type that is part of the union which can be used to distinguish that object)
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird': 
      speed = animal.flyingSpeed;
      break;
    case 'horse': 
      speed = animal.runningSpeed;
      break;
  }
  console.log("moving with speed: " + speed)
}

moveAnimal({type: 'bird', flyingSpeed: 10});