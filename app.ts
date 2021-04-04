
//the output parameter is said to be of type literal (it must be either the string 'number or 'string')
function combine(input1: number | string, input2: number | string, output: 'number' | 'string') {
	let result;
	if (typeof input1 === "number" && typeof input2 === "number" || output === 'number') {
		//typescript complains about operations whenever the parameter types are more than one possibility (as above), so we need run-time logic to narrow down which type we're handling where
		result = input1 + input2;
	} else {
    result = input1.toString() + input2.toString();
	}
  return result;
}

combine('1', '3', 'number');
