import { readonly, autobind, around, log, timer } from './core/core-decorators';

class Student {

  @readonly
  name = 'Tommy';

  @timer
  @log
  sayHello() {
    console.log('Hello, ' + this.name);
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
