//'keyof' keyword is useful in the case when you want to add security when accessing an objects keys but you aren't sure they will be present

//type 'T' is an object and 'U' must be a key of type object T
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]
}

//ok
extractAndConvert({name: "Adam"} ,"name")

//error as 'age' is not a key in the object given
// extractAndConvert({name: "Adam"} ,"age")
