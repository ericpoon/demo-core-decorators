import decorate from './decorate';

export default decorate(function (fn, target, name) {
  return function (...args) { // Warning: do NOT use arrow function here
    const timerName = target.constructor.name + '.' + name;
    console.time(timerName);
    const result = fn.bind(this)(...args);
    console.timeEnd(timerName);
    return result;
  };
});
