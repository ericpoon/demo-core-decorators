import { before, afterReturning, afterThrowing, afterFinally, around } from '../src/decorators';

const FUNCTION_BODY = '[FUNCTION_BODY]';
const FUNCTION_BODY_BEFORE_THROWING = '[FUNCTION_BODY_BEFORE_THROWING]';
const BEFORE = '[BEFORE]';
const AFTER_RETURNING = '[AFTER_RETURNING]';
const AFTER_THROWING = '[AFTER_THROWING]';
const AFTER_FINALLY = '[AFTER_FINALLY]';

describe('before', () => {
  let string = '';
  let doBefore = null;
  let Tester = null;

  beforeEach(() => {
    string = '';
    doBefore = jest.fn(() => {
      string += BEFORE;
    });
    Tester = class T {
      @before(doBefore)
      foo() {
        string += FUNCTION_BODY;
      }

      @before(() => null)
      getThis() {
        return this;
      }

      @before(doBefore)
      throwException() {
        throw '';
      }
    };
  });

  it('calls doBefore before actual function body', () => {
    new Tester().foo();
    expect(doBefore).toHaveBeenCalledTimes(1);
    expect(string).toBe(BEFORE + FUNCTION_BODY);
  });

  it('does not lose `this`', () => {
    const that = new Tester().getThis();
    expect(that).toBeDefined();
    expect(that instanceof Tester).toBeTruthy();
  });

  it('calls doBefore even though the method throws', () => {
    expect(() => {
      new Tester().throwException();
    }).toThrow();
    expect(doBefore).toHaveBeenCalledTimes(1);
    expect(string).toBe(BEFORE);
  });
});

describe('afterThrowing', () => {
  let string = '';
  let doAfterReturning = null;
  let Tester = null;

  beforeEach(() => {
    string = '';
    doAfterReturning = jest.fn(() => {
      string += AFTER_RETURNING;
    });
    Tester = class T {
      @afterReturning(doAfterReturning)
      foo() {
        string += FUNCTION_BODY;
      }

      @afterReturning(() => null)
      getThis() {
        return this;
      }

      @afterReturning(doAfterReturning)
      throwException() {
        throw '';
      }
    };
  });

  it('calls doAfterReturning after the method returns', () => {
    new Tester().foo();
    expect(doAfterReturning).toHaveBeenCalledTimes(1);
    expect(string).toBe(FUNCTION_BODY + AFTER_RETURNING);
  });

  it('does not lose `this`', () => {
    const that = new Tester().getThis();
    expect(that).toBeDefined();
    expect(that instanceof Tester).toBeTruthy();
  });

  it('does not call doAfterReturning if the method throws', () => {
    expect(() => {
      new Tester().throwException();
    }).toThrow();
    expect(doAfterReturning).toHaveBeenCalledTimes(0);
  });
});

describe('afterThrowing', () => {
  let string = '';
  let doAfterThrowing = null;
  let Tester = null;

  beforeEach(() => {
    string = '';
    doAfterThrowing = jest.fn(() => {
      string += AFTER_THROWING;
    });
    Tester = class T {
      @afterThrowing(doAfterThrowing)
      successfullyReturn() {
        string += FUNCTION_BODY;
      }

      @afterThrowing(doAfterThrowing)
      throwException() {
        string += FUNCTION_BODY_BEFORE_THROWING;
        throw '';
      }

      @afterThrowing(() => null)
      getThis() {
        return this;
      }
    };
  });

  it('calls doAfterThrowing after the method throws', () => {
    expect(() => {
      new Tester().throwException();
    }).toThrow();
    expect(doAfterThrowing).toHaveBeenCalledTimes(1);
    expect(string).toBe(FUNCTION_BODY_BEFORE_THROWING + AFTER_THROWING);
  });

  it('does not call doAfterThrowing if the method returns', () => {
    new Tester().successfullyReturn();
    expect(doAfterThrowing).toHaveBeenCalledTimes(0);
  });

  it('does not lose `this`', () => {
    const that = new Tester().getThis();
    expect(that).toBeDefined();
    expect(that instanceof Tester).toBeTruthy();
  });
});

describe('afterFinally', () => {
  let string = '';
  let doAfterFinally = null;
  let Tester = null;

  beforeEach(() => {
    string = '';
    doAfterFinally = jest.fn(() => {
      string += AFTER_FINALLY;
    });
    Tester = class T {
      @afterFinally(doAfterFinally)
      successfullyReturn() {
        string += FUNCTION_BODY;
      }

      @afterFinally(doAfterFinally)
      throwException() {
        string += FUNCTION_BODY_BEFORE_THROWING;
        throw '';
      }

      @afterFinally(() => null)
      getThis() {
        return this;
      }
    };
  });

  it('calls doAfterThrowing after the method throws', () => {
    expect(() => {
      new Tester().throwException();
    }).toThrow();
    expect(doAfterFinally).toHaveBeenCalledTimes(1);
    expect(string).toBe(FUNCTION_BODY_BEFORE_THROWING + AFTER_FINALLY);
  });

  it('does not call doAfterThrowing if the method returns', () => {
    new Tester().successfullyReturn();
    expect(doAfterFinally).toHaveBeenCalledTimes(1);
    expect(string).toBe(FUNCTION_BODY + AFTER_FINALLY);
  });

  it('does not lose `this`', () => {
    const that = new Tester().getThis();
    expect(that).toBeDefined();
    expect(that instanceof Tester).toBeTruthy();
  });
});

describe('around', () => {

  it('passes fn, args, target and name to proceeding join point handler and returns correctly', () => {
    expect.assertions(5);

    const returnValue = 'RETURN' + Math.random();
    const handleProceedingJoinPoint = jest.fn((fn, args, target, name) => {
      expect(target.constructor.name).toBe('Tester');
      expect(name).toBe('foo');
      return fn(...args);
    });
    const spy = jest.fn();

    class Tester {
      @around(handleProceedingJoinPoint)
      foo(...args) {
        spy(...args);
        return returnValue;
      }
    }

    const args = [1, true, 'str'];
    const returned = new Tester().foo(...args);
    expect(returned).toBe(returnValue);
    expect(handleProceedingJoinPoint).toHaveBeenCalledWith(expect.anything(), args, expect.anything(), 'foo');
    expect(spy).toHaveBeenCalledWith(...args);
  });

  it('handles exception within the handler of proceeding join point', () => {
    const exception = 'EXCEPTION' + Math.random();
    const handleException = jest.fn();
    const handleProceedingJoinPoint = (fn, args) => {
      try {
        return fn(...args);
      } catch (e) {
        handleException(e);
      }
    };

    class Tester {
      @around(handleProceedingJoinPoint)
      foo() {
        throw exception;
      }
    }

    expect(() => {
      new Tester().foo();
    }).not.toThrow();
    expect(handleException).toHaveBeenCalledWith(exception);

  });

  it('throws exception back to the caller', () => {
    const exception = 'EXCEPTION' + Math.random();
    const handleProceedingJoinPoint = (fn, args) => {
      try {
        return fn(...args);
      } catch (e) {
        throw e;
      }
    };

    class Tester {
      @around(handleProceedingJoinPoint)
      foo() {
        throw exception;
      }
    }

    expect(() => {
      new Tester().foo();
    }).toThrow(exception);
  });

});

