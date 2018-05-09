import decorate from './decorate';

export function before(doBefore) {
  function decorator(fn, target, name) {
    return function (...args) {
      doBefore(target, name, args);
      return fn.bind(this)(...args);
    };
  }

  return decorate(decorator);
}

export function afterReturning(doAfterReturning) {
  function decorator(fn, target, name) {
    return function (...args) {
      let result;
      try {
        result = fn.bind(this)(...args);
        doAfterReturning(target, name, args, result);
      } catch (e) {
        throw e;
      }
      return result;
    };
  }

  return decorate(decorator);
}

export function afterThrowing(doAfterThrowing) {
  function decorator(fn, target, name) {
    return function (...args) {
      let result;
      try {
        result = fn.bind(this)(...args);
      } catch (e) {
        doAfterThrowing(target, name, args, e);
        throw e;
      }
      return result;
    };
  }

  return decorate(decorator);
}

export function afterFinally(doAfterFinally) {
  function decorator(fn, target, name) {
    return function (...args) {
      let result;
      try {
        result = fn.bind(this)(...args);
      } catch (e) {
        throw e;
      } finally {
        doAfterFinally(target, name, args);
      }
      return result;
    };
  }

  return decorate(decorator);
}

export function around(handleProceedingJoinPoint) {
  function decorator(fn, target, name) {
    return function (...args) {
      return handleProceedingJoinPoint(fn.bind(this), args, target, name);
    };
  }

  return decorate(decorator);
}
