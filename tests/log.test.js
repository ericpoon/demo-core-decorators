import { log } from '../src/decorators';

class Tester {
  @log
  foo() {
  }

  @log
  getThis() {
    return this;
  }

  @log
  add(a, b) {
    return a + b;
  }
}

const originalLogger = console.log;

afterEach(() => {
  console.log = originalLogger;
});

it('logs before and after function call', () => {
  expect.assertions(3);

  const mockLogger = jest.fn((str) => {
    expect(str).toMatch(/(>> Function Tester.foo starts)|(<< Function Tester.foo ends)/);
  });
  console.log = mockLogger;
  new Tester().foo();

  expect(mockLogger).toHaveBeenCalledTimes(2);
});

it('does not lose `this`', () => {
  const that = new Tester().getThis();
  expect(that).toBeDefined();
  expect(that instanceof Tester).toBeTruthy();
});

it('logs arguments and returning value', () => {
  expect.assertions(3);

  let isBefore = true;
  const mockLogger = jest.fn((str) => {
    if (isBefore) {
      expect(str).toMatch(/arguments: 13,29/);
      isBefore = false;
    } else {
      expect(str).toMatch(/returning: 42/);
    }
  });
  console.log = mockLogger;
  new Tester().add(13, 29);

  expect(mockLogger).toHaveBeenCalledTimes(2);
});

it('logs arguments and returning value - no arguments and return value', () => {
  expect.assertions(3);

  let isBefore = true;
  const mockLogger = jest.fn((str) => {
    if (isBefore) {
      expect(str).toMatch(/no arguments/);
      isBefore = false;
    } else {
      expect(str).toMatch(/returning: undefined/);
    }
  });
  console.log = mockLogger;
  new Tester().foo();

  expect(mockLogger).toHaveBeenCalledTimes(2);
});
