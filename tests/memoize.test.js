import { memoize } from '../src/decorators';

const sumSpy = jest.fn();

class Tester {
  @memoize
  sum(from, to) {
    let result = 0;
    sumSpy();
    for (let i = from; i <= to; i++) {
      result += i;
    }
    return result;
  }

  @memoize
  getThis() {
    return this;
  }
}

it('should not re-calculate if input does not change', () => {
  const tester = new Tester();
  const sumResult = 165;

  const calculation1 = tester.sum(10, 20);
  expect(calculation1).toBe(sumResult);
  expect(sumSpy).toHaveBeenCalledTimes(1);

  const calculation2 = tester.sum(10, 20);
  expect(calculation2).toBe(sumResult);
  expect(sumSpy).toHaveBeenCalledTimes(1);

  const calculation3 = tester.sum(10, 20);
  expect(calculation3).toBe(sumResult);
  expect(sumSpy).toHaveBeenCalledTimes(1);
});

it('should re-calculate if input changes', () => {
  const tester = new Tester();

  const calculation1 = tester.sum(10, 20);
  expect(calculation1).toBe(165);
  expect(sumSpy).toHaveBeenCalledTimes(1);

  const calculation2 = tester.sum(5, 15);
  expect(calculation2).toBe(110);
  expect(sumSpy).toHaveBeenCalledTimes(2);

  const calculation3 = tester.sum(1, 100);
  expect(calculation3).toBe(5050);
  expect(sumSpy).toHaveBeenCalledTimes(3);
});

it('does not lose `this`', () => {
  const that1 = new Tester().getThis();
  expect(that1 instanceof Tester);

  const that2 = new Tester().getThis();
  expect(that2 instanceof Tester);
  expect(that2).toBe(that1);
});
