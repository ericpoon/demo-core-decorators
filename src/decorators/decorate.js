/**
 * Higher order function must NOT be arrow function
 * MUST bind the original function with `this` in custom decorator
 */
export default function decorate(decorator) {
  return function (target, name, descriptor) {
    if (typeof descriptor.value === 'function') {
      const fn = descriptor.value;
      descriptor.value = decorator(fn, target, name, descriptor);
    } else if (typeof descriptor.get === 'function' && typeof descriptor.get() === 'function') {
      const fn = descriptor.get();
      descriptor.get = () => decorator(fn, target, name, descriptor);
    }
    return descriptor;
  };
}
