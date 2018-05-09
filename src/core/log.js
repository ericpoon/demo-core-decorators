import around from './around';

export default function log(target, name, descriptor) {

  return around(
    (target, name, descriptor, args) => console.log(`>> Function ${name} starts, with arguments: ${args}`),
    (target, name, descriptor, args, result) => console.log(`<< Function ${name} ends, returning: ${result}`),
  )(target, name, descriptor);
}
