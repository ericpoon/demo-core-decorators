import { timer } from '../src/decorators';

class Tester {
  @timer
  getThis() {
    return this;
  }
}

const originalTime = console.time;
const originalTimeEnd = console.timeEnd;

afterEach(() => {
  console.time = originalTime;
  console.timeEnd = originalTimeEnd;
});

it('logs time', () => {
  console.time = jest.fn();
  console.timeEnd = jest.fn();
  new Tester().getThis();
  expect(console.time).toHaveBeenCalledTimes(1);
  expect(console.timeEnd).toHaveBeenCalledTimes(1);
});

it('does not lose `this`', () => {
  const that = new Tester().getThis();
  expect(that instanceof Tester).toBeTruthy();
});
