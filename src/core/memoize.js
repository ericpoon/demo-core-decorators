function memoizeHelper(fn) {
  let inputs;
  let result;
  return function (...args) {
    if (!inputs) {
      inputs = args;
      result = fn(...args);
      return result;
    }

    let sameInput = true;
    for (let i = 0; i < args.length; i++) {
      if (args[i] !== inputs[i]) {
        sameInput = false;
        break;
      }
    }

    if (!sameInput) {
      result = fn(...args);
      inputs = args;
    }

    return result;

  };
}

export default function memoize(target, name, descriptor) {
  if (descriptor.value) {
    const fn = descriptor.value;
    if (typeof fn === 'function') {
      descriptor.value = memoizeHelper(fn);
    }
  } else if (typeof descriptor.get === 'function' && typeof descriptor.get() === 'function') {
    descriptor.get = () => memoizeHelper(descriptor.get());
  }

  return descriptor;
}
