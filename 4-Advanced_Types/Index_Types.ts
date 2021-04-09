//allows us to creates objs which are more flexible regarding the props they might hold

//for example if you need to specify and ErrorContainer obj where you know the value type of certain properties but you don't know how many or what their names will be

interface ErrorContainer {
  //boolean is not a value type here
  [prop: string]: string;   //this is saying that any properties present will have keys that are string and values that are strings

  //you can add defined properties too but they must be of the same type as the index type above;
  //ok
  id: string;

  //not ok
  // id2: number;
}

const errorBag: ErrorContainer = { 
  //keys that are numbers can be interpreted as strings but not the other way around
  1: 'One',
  id: 'TommyBoy',
}