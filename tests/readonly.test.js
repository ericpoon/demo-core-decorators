import { readonly } from '../src/decorators';

class Tester {
  @readonly
  constant = 100;
}

it('cannot re-assign to read only field', () => {
  const tester = new Tester();
  expect(() => {
    tester.constant = 1;
  }).toThrow(/read only/);
  expect(tester.constant).toBe(100);
});
