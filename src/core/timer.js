import around from './around';

export default function timer(target, name, descriptor) {
  return around(
    (target, name) => console.time(name),
    (target, name) => console.timeEnd(name),
  )(target, name, descriptor);
}
