import decorate from './decorate';

export default decorate(function (fn, target, name) {
  return function (...args) { // Warning: do NOT use arrow function here
    const funcName = target.constructor.name + '.' + name;
    let argsStr = '';
    if (args && args.length > 0) {
      argsStr = `arguments: ${args}`;
    } else {
      argsStr = 'no arguments';
    }
    console.log(`>> Function ${funcName} starts, with ${argsStr}`);
    const result = fn.bind(this)(...args);
    console.log(`<< Function ${funcName} ends, returning: ${result}`);
    return result;
  };
});
