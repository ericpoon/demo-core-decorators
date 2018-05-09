import decorate from './decorate';

export default decorate(function (fn, target, name) {
  return function (...args) { // Warning: do NOT use arrow function here
    console.time(name);
    const result = fn.bind(this)(...args);
    console.timeEnd(name);
    return result;
  };
});
