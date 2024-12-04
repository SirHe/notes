// const obj = {
//     a: 1,
//     [Symbol.iterator]: () => {
//         return {
//             next: () => {
//                 return {
//                     value: obj.a++,
//                     done: obj.a > 10
//                 };
//             }
//         };
//     }
// }

// const arr = [1,2]
// arr[Symbol.iterator] = function* () {
//     yield 2;
//     yield 3;
// }

// for (const item of arr) {
//     console.log(item);
// }
const g = function* () {
    yield 2;
    yield 3;
}
const fn = g()
console.log(fn);
console.log(fn.next());
console.log(fn.next());
console.log(fn.next());