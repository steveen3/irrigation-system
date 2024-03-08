// Blink an LED
const { EtherPortClient } = require("etherport-client");
var five = require("johnny-five");

const etherPort = new EtherPortClient({
  host: "192.168.247.226", //l'adresse IP de votre ESP8266
  port: 3030,
});

// Blink an LED

function allumerLed() {
  var board = new five.Board({ port: etherPort, repl: false });

  board.on("ready", function () {
    var led = new five.Led(14);
    led.on();
  });
}

function eteindreLed() {
  var board = new five.Board({ port: etherPort, repl: false });
  board.on("ready", function () {
    var led = new five.Led(14);
    led.off();
  });
}

module.exports = { allumerLed, eteindreLed };
