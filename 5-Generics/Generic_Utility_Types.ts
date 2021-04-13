//The partial Type allows say that in this specific instance obj/item, the properties are temporarily optional (useful if you initial an empty object of a specific type then gradually add the properties as you proceed (doing some validation in between, or something else))
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  //initiallizing the emptyp CourseGoal obj
  let courseGoal: Partial<CourseGoal> = {};

  //doing some validation mabye then...
  courseGoal.title = title;

  //...
  courseGoal.description = description;

  //...  
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}
  

  //Readonly:
  const namesReadOnly: Readonly<string[]> = ['Anna','TOm'];