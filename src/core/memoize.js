import decorate from './decorate';

function memoizeDecorator(fn) {
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

export default decorate(memoizeDecorator);
