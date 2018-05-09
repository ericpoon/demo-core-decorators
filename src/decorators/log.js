import decorate from './decorate';

export default decorate(function (fn, target, name) {
  return function (...args) { // Warning: do NOT use arrow function here
    console.log(`>> Function ${name} starts, with arguments: ${args}`);
    const result = fn.bind(this)(...args);
    console.log(`<< Function ${name} ends, returning: ${result}`);
    return result;
  };
});
