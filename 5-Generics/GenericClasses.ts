interface Human {
  name: string;
  age: number;
}

class User implements Human {
  constructor(public name: string, public age: number){};
}

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    if (item instanceof User) {
      const  { isSame } = this.getIsSame(item)
      if (!isSame) {
        this.data.push(item);
      }
      return;
    }
    const index = this.data.indexOf(item);
    if (index === -1) this.data.push(item);
  }

  removeItem(item: T) {
    if (item instanceof User) {
      const { isSame, index } = this.getIsSame(item);
      if (isSame) {
        this.data.splice(index, 1);
      }
      return;
    }
    const index = this.data.indexOf(item);
    if (index !== -1) this.data.splice(index, 1);
  }

  getItems() {
    return [...this.data];
  }

  getIsSame(item: T) {
    let isSame = false;
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      const dataItem = this.data[i];
      if (JSON.stringify(dataItem) === JSON.stringify((item))) {
        isSame = true;
        index = i;
        break;
      }
    }
    return {isSame, index};
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Text1');
textStorage.addItem('Text2');
textStorage.addItem('Text2');
textStorage.removeItem('Max')
console.log('textStorage =', textStorage);

const numberStorage = new DataStorage<number>();
numberStorage.addItem(33);
numberStorage.addItem(44);
numberStorage.addItem(33);
numberStorage.removeItem(33)
console.log('numberStorage =', numberStorage);

const userOne = new User('Adam', 30);
const userTwo = new User('Tom', 31);
const userThree = new User('Jonn', 33);
const userFour = new User('Jonn', 33);
const objStorage = new DataStorage<object>();
objStorage.addItem(userOne);
objStorage.addItem(userTwo);
objStorage.addItem(userThree);
objStorage.addItem(userFour);
objStorage.removeItem(new User('Adam', 30));
console.log('objStorage =', objStorage);

