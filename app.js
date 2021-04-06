//the output parameter is said to be of type literal (it must be either the string 'number or 'string')
function combine(input1, input2, output) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number" || output === 'number') {
        //typescript complains about operations whenever the parameter types are more than one possibility (as above), so we need run-time logic to narrow down which type we're handling where
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
combine('1', '3', 'number');
function add(n1, n2) {
    return n1 + n2;
}
function print(str) {
    console.log(str);
}
function print(str) {
    console.log(str);
    return;
}
//Using the Function Type to specify what kind of functions myFunction can have a ref to (two number params [named anything] that return a number)
var myFunction;
//ok
myFunction = add;
//Using a callback
function addAndHandle(n1, n2, callBack) {
    var result = n1 + n2;
    callBack(result);
}
addAndHandle(4, 5, print);
//the 'unknown' type is kind of like the 'any' type but it differs in one important way.  unknown type things can not be assigned to known types:
var userInput;
var userName;
userInput = '123';
userInput = 5;
//typescript complains when this happens:
userName = userInput;
//need to explicitly check the type then typescript is happy:
if (typeof userInput === 'string') {
    userName = userInput;
}
//the 'never' type is commonly used in error obj creation function that immediately throw the generated error as well as inifinite loops
//it signies that the function 'terminates' execution of the script and it will never resume/return anything
function generateError(msg, code) {
    throw { msg: msg, code: code };
    // while (true) {};
}
