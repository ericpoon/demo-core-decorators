import { decorate } from '../src/decorators';

const decoratorSpy = jest.fn();

const decorator = function (fn, target, name, descriptor) {
  return function (...args) {
    decoratorSpy(target.constructor.name, name, descriptor);
    return '[decorated] ' + fn.bind(this)(...args);
  };
};

const identity = function (fn) {
  return function (...args) {
    return fn.bind(this)(...args);
  };
};

const arrowFuncDecoratorLosesThis = function (fn) {
  return (...args) => { // warning: arrow function is BAD practice as `this` is lost
    return fn.bind(this)(...args);
  };
};

const noBindingLosesThis = function (fn) {
  return function (...args) {
    return fn(...args);
  };
};

class Tester {
  @decorate(decorator)
  foo() {
    return 'foo';
  }

  @decorate(identity)
  getThis() {
    return this;
  }
}

class BadTester {
  @decorate(arrowFuncDecoratorLosesThis)
  getThis1() {
    return this;
  }
  @decorate(noBindingLosesThis)
  getThis2() {
    return this;
  }
}

it('decorates and has correct target, name and descriptor', () => {
  const str = new Tester().foo();
  expect(str).toBe('[decorated] foo');
  expect(decoratorSpy).toHaveBeenCalledTimes(1);
  expect(decoratorSpy).toHaveBeenLastCalledWith(
    'Tester',
    'foo',
    expect.objectContaining({
      enumerable: false,
      configurable: true,
      writable: true,
    }));
});

it('does not lose `this`', () => {
  const that = new Tester().getThis();
  expect(that).toBeDefined();
  expect(that instanceof Tester);
});

it('loses `this` if using arrow function as higher order function', () => {
  const that = new BadTester().getThis1();
  expect(that).toBeUndefined();
});

it('loses `this` if the function is unbound in decorator', () => {
  const that = new BadTester().getThis2();
  expect(that).toBeUndefined();
});
