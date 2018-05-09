export default function lazyinit(target, name, descriptor) {
  let value;
  let didInit = false;
  let init = descriptor.initializer;

  if (typeof init === 'function') {
    descriptor = {
      enumerable: true,
      get() {
        if (!didInit) {
          value = init.bind(this)();
          didInit = true;
        }
        return value;
      },
      set(v) {
        value = v;
      },
    };
  }

  return descriptor;
}
