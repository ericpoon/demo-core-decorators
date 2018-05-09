export default function decorate(decorator) {
  return function (target, name, descriptor) {
    if (descriptor.value) {
      const fn = descriptor.value;
      if (typeof fn === 'function') {
        descriptor.value = decorator(fn, target, name, descriptor);
      }
    } else if (typeof descriptor.get === 'function' && typeof descriptor.get() === 'function') {
      const fn = descriptor.get();
      descriptor.get = () => decorator(fn, target, name, descriptor);
    }
    return descriptor;
  };
}
