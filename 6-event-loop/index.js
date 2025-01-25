
// JavaScript is single threaded and Synchronous;

// console.log("first task");
// console.time();
// for(let i = 0; i <= 10000000; i++) {
//   //because of single thread and sync, the events(code) after this loop need to wait untill the loop to complete;
// }
// console.timeEnd();
// console.log("next task");


console.log("first task");
setTimeout(() => {
  console.log('second task 1');
  // setTimeout() is asnyc;
  // even the time is 0, this callback func will execute once all the sync code is executed;
  // this callback func(event) is given to task queue after the timeout, once the stack is empty 
  // then the events in task queue is add to stack one by one this is called as event loop;
}, 0);

setTimeout(() => {
  console.log('second task 2');
}, 100);

setTimeout(() => {
  console.log('second task 3');
}, 10);

console.log("next task");
console.log("next task");
console.log("next task");
console.log("next task");
console.log("next task");