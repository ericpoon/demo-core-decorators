export default function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
