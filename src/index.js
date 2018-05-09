import { readonly, log, timer, lazyinit, memoize } from './core/core-decorators';

class Student {

  @readonly
  name = 'Tommy';

  @timer
  @log
  sayHello() {
    console.log('Hello, ' + this.name);
  }

  @lazyinit
  gpa = (() => {
    let i = 0;
    let total = 0;
    console.time('calculating gpa');
    while (i++ < 99999999) {
      total += Math.random() * 2 + 2;
    }
    console.timeEnd('calculating gpa');
    return total / i;
  })();

  @memoize
  expensive() {
    let i = 0;
    console.time('expensive operation');
    while (i < 1000000000) {
      i++;
    }
    console.timeEnd('expensive operation');
    return i;
  }

}

const student = new Student();
try {
  student.name = 'Adam';
} catch (e) {
  console.log('Exception caught:', e.message);
}
console.log('Student name:', student.name);

console.log();
student.sayHello();
console.log();

console.log(student.gpa);
console.log(student.gpa);
console.log(student.gpa);

console.log(student.expensive());
console.log(student.expensive());
console.log(student.expensive());
