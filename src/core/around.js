export default function around(before, after) {
  return function (target, name, descriptor) {
    function decorate(fn) {
      return function (...args) {
        if (typeof before === 'function') {
          before(target, name, descriptor, args);
        }
        const result = fn.bind(this)(...args);
        if (typeof after === 'function') {
          after(target, name, descriptor, args, result);
        }
        return result;
      };
    }

    if (descriptor.value) {
      let fn = descriptor.value;
      if (typeof fn === 'function') {
        descriptor.value = decorate(fn);
      }
    } else if (typeof descriptor.get === 'function') {
      const fn = descriptor.get();
      if (typeof fn === 'function') {
        descriptor.get = () => decorate(fn);
      }
    }

    return descriptor;
  };
}
