import { lazyinit } from '../src/decorators';

const expensiveOperation = jest.fn(() => {
  return 100;
});

class Tester {
  @lazyinit
  score = expensiveOperation();

  @lazyinit
  myself = (() => {
    return this;
  })();
}

it('does not initialize when instantiation', () => {
  new Tester();
  expect(expensiveOperation).toHaveBeenCalledTimes(0);
});

it('gets initialized at the first time to use it', () => {
  const tester = new Tester();
  expect(tester.score).toBe(100);
  expect(expensiveOperation).toHaveBeenCalledTimes(1);
});

it('never calculates again after initialization', () => {
  const tester = new Tester();
  tester.score;
  tester.score;
  tester.score;
  expect(expensiveOperation).toHaveBeenCalledTimes(1);
});

it('does not lose `this`', () => {
  const that = new Tester().myself;
  expect(that instanceof Tester);
});
