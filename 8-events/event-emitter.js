const EventEmitter = require("events");
// EventEmitter is class given by events module;

const customEmitter = new EventEmitter();
// customEmitter is a instanceof class EventEmitter;

customEmitter.on("res", function(name, age) {
  console.log(`Name: ${name}, Age: ${age}`);
  console.log("data received", this, this === customEmitter);
})
customEmitter.on("res", () => {
  console.log("data received", this, this === customEmitter);
})
// on() method is used to set the call back function for specific event.
// it takes two parameter - 1 name of the event, 2 callBack function 

customEmitter.emit("res", "harshan", 24);
// emit: making a noise or produce something
// emit() trigger the event using the event name and the remaining parameter gives to the callBack func as parameter

// on() and emit() method keeps the order