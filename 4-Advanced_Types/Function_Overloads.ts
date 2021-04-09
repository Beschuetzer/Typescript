//function overloading = defining multiple function signatures

//place the overloaded signatures above the function definition
function combineOverloaded (input1: number, input: number): number;
function combineOverloaded (input1: string, input: string): string;
function combineOverloaded (input1: number, input: string): string;
function combineOverloaded(
  input1: Combinable,
  input2: Combinable,
) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}