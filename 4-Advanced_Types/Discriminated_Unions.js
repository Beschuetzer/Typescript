"use strict";
function moveAnimal(animal) {
    var speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log("moving with speed: " + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
//# sourceMappingURL=Discriminated_Unions.js.map