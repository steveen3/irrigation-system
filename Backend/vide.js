/* // Crée un nouvel objet Date représentant la date et l'heure actuelles
var dateCourante = new Date();

// Obtient la date sous forme de chaîne de caractères
var date = dateCourante.toDateString();

// Obtient l'heure sous forme de chaîne de caractères
var heure = dateCourante.toLocaleTimeString();

// Affiche la date et l'heure actuelles
console.log("Date : " + date);
console.log("Heure : " + heure);
 */

const { declencherArrosage } = require("./server");

declencherArrosage("plantain");
