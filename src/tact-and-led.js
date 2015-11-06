"use strict";

const gpio = require("gpio");

const channel = {
  tact: 4,
  led: 17
};

const gpioTact = gpio.export(channel.tact, {
  direction: "in",
  ready(){
    console.log("GPIO4 is ready!!");
  }
});

const gpioLed = gpio.export(channel.led, {
  direction: "out",
  ready(){
    console.log("GPIO17 is ready!!");
  }
});

gpioTact.on("change", (val) => {
  console.log(val);
  if(val === 1){
    gpioLed.set();
  }else{
    gpioLed.set(0);
  }
});

process.on("SIGINT", () => {
  gpioLed.reset();
  gpioLed.unexport();
  gpioTact.unexport();
  console.log("\nBye!!");
});
