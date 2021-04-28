namespace App {
  export function autoBind(target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get () {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    }
    return adjustedDescriptor;
  }
}