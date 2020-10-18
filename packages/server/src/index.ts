import { square } from '@firetype/core';
import { multiplyBy2 } from './_utils';

console.log(square(4));
console.log(multiplyBy2(4));

export function concat(str1: string, str2: string) {
  return str1 + str2;
}
