// node js is a runtime environment for javascript;
// two way to execute the node code REPL and CLI;
// REPL - Read-Eval-Print-Loop, it take single line and execte them in terminal;
// CLI - Command Line Interface, means of interacting wit software via commands used to run the program;



console.log("Hello, World! node js");

console.log("second sync line");

setTimeout(() => {
  console.log("first async line");
}, 2000);

console.log("last sync line");