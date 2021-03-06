import { readonly, log, timer, lazyinit, memoize, before, afterFinally, around, autobind } from './decorators';

function handleProceedingJoinPoint(fn, args, target, name) {
  console.log('around: start calling function:', target.constructor.name + '.' + name);
  const result = fn(...args);
  console.log('around: finish calling, returning:', result);
  return result;
}

class Student {

  @readonly
  name = 'Tommy';

  @log
  @timer
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
    console.log(this.name + '\' GPA is ' + total / i);
    return total / i;
  })();

  @memoize
  expensive() {
    console.log('doing expensive operation on ' + this.name);
    let i = 0;
    console.time('expensive operation');
    while (i < 1000000000) {
      i++;
    }
    console.timeEnd('expensive operation');
    return i;
  }

  @before(() => console.log('before'))
  @afterFinally(() => console.log('after finally'))
  @around(handleProceedingJoinPoint)
  testAOP() {
    console.log('testAOP', this);
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

student.testAOP();
