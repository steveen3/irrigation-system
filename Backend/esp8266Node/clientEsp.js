const { EtherPortClient } = require("etherport-client");
const { Board, Led } = require("johnny-five");
//const sensor2 = require("../sensorNode_2/sensor2");
var five = require("johnny-five");
//var relays = require("../relayNode/relays");
const maxRawValue = 1024;

const etherPort = new EtherPortClient({
  host: "192.168.67.226", //l'adresse IP de votre ESP8266
  port: 3030,
});

const board = new Board({ port: etherPort, repl: false });

board.on("ready", function () {
  /*capteur d'humidité*/

  var temp = new five.Sensor({
    pin: "A0",
    freq: 250,
    threshold: 5,
  });

  temp.on("change", function () {
    let lectureCapteur1 = temp.value;
    let humiditePourcentage = 100 - (lectureCapteur1 * 100) / maxRawValue;

    console.log("le degre d'humidité est : ", humiditePourcentage + "%");

    // Envoyer les données au serveur
    fetch("http://localhost:3007/donnees-capteur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        humidite: humiditePourcentage.toFixed(2),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La réponse du réseau n'est pas valide");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse du serveur :", data);
      })
      .catch((error) => {
        console.error(
          "Il y a eu un problème avec votre opération de fetch :",
          error
        );
      });
  });
});

// Blink an LED

function allumerPompe() {
  var board = new five.Board({ port: etherPort, repl: false });

  board.on("ready", function () {
    var led = new five.Led(14);
    led.on();
  });
}

function eteindrePompe() {
  var board = new five.Board({ port: etherPort, repl: false });
  board.on("ready", function () {
    var led = new five.Led(14);
    led.off();
  });
  board.off("ready", function () {
    console.log("carte eteinte");
  });
}

module.exports = { eteindrePompe, allumerPompe };
