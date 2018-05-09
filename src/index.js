import { readonly, log, timer, lazyinit } from './core/core-decorators';

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
    console.time('calculating gpa');
    while (i < 999999999) {
      i++;
    }
    console.timeEnd('calculating gpa');
    return i;
  })();

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
