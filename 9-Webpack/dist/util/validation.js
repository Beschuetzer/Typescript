export function validate(validatableInput) {
    let isValid = { error: null };
    if (validatableInput.required) {
        if (validatableInput.value.toString().trim().length === 0)
            return { error: `${validatableInput.inputName} is required.` };
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        if (validatableInput.value.trim().length < validatableInput.minLength)
            return { error: `${validatableInput.value} is shorter than ${validatableInput.minLength} in ${validatableInput.inputName}!` };
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        if (validatableInput.value.trim().length > validatableInput.maxLength)
            return { error: `${validatableInput.value} is longer than ${validatableInput.maxLength} in ${validatableInput.inputName}!` };
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        if (validatableInput.value < validatableInput.min)
            return { error: `${validatableInput.value} is shorter than ${validatableInput.min} in ${validatableInput.inputName}!` };
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        if (validatableInput.value > validatableInput.max)
            return { error: `${validatableInput.value} is longer than ${validatableInput.max} in ${validatableInput.inputName}!` };
    }
    return isValid;
}
//# sourceMappingURL=validation.js.map