namespace App {
  export interface Validatable {
    value: string | number;
    inputName: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export interface Error {
    error: string | null;
  }

  export function validate (validatableInput: Validatable): Error {
    let isValid = {error: null} as Error;
    if (validatableInput.required) {
      if (validatableInput.value.toString().trim().length === 0) return {error: `${validatableInput.inputName} is required.`} as Error;
    }
    if (
      validatableInput.minLength != null && 
      typeof validatableInput.value === 'string'
    ) {
      if (validatableInput.value.trim().length < validatableInput.minLength) return {error: `${validatableInput.value} is shorter than ${validatableInput.minLength} in ${validatableInput.inputName}!`} as Error;
    }
    if (
      validatableInput.maxLength != null && 
      typeof validatableInput.value === 'string'
    ) {
      if (validatableInput.value.trim().length > validatableInput.maxLength) return {error: `${validatableInput.value} is longer than ${validatableInput.maxLength} in ${validatableInput.inputName}!`} as Error;
    }
    if (
      validatableInput.min != null && 
      typeof validatableInput.value === 'number'
    ) {
      if (validatableInput.value < validatableInput.min) return {error: `${validatableInput.value} is shorter than ${validatableInput.min} in ${validatableInput.inputName}!`} as Error;
    }
    if (
      validatableInput.max != null && 
      typeof validatableInput.value === 'number'
    ) {
      if (validatableInput.value > validatableInput.max) return {error: `${validatableInput.value} is longer than ${validatableInput.max} in ${validatableInput.inputName}!`} as Error;
      }
    return isValid;
  }
}