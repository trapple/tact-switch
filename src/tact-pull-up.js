"use strict";

const gpio = require("gpio");

const channel = 4;

const gpio4 = gpio.export(channel, {
  direction: "in",
  ready() {
    console.log(`GPIO${channel} is ready!!`);
  }
});

gpio4.on("change", (val) => {
  console.log(val);
});

process.on("SIGINT", () => {
  gpio4.unexport();
  console.log("\nBye!!");
});
