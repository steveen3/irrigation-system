const express = require("express");
const app = express();
//const test = require("./esp8266Node/clientEsp");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  getSeuilPlanteInfo,
} = require("./serverNode/authentification/views/database");

// Utilisation de Socket.IO
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const port = 3007;

/*partie authentification*/

//const connectDB = require("./serverNode/authentification/views/database");
const errorHandler = require("./serverNode/authentification/middleware/error");
//const { humidity } = require("./serverNode/authentification/models/humidity");

app.use("/api/auth", require("./serverNode/authentification/routes/auth"));
app.use(errorHandler);

/* fin de la partie authentification*/

// app.post("/allumer", (req, res) => {
//   test.allumerPompe();

//   res.send(200);
//   console.log("pompe allumee");
// });

// app.post("/eteindre", (req, res) => {
//   test.eteindrePompe();
//   res.send(200);
//   console.log("pompe eteinte");
// });

// let Humidity;

// app.post("/donnees-capteur", (req, res) => {
//   const { humidite } = req.body;
//   res.status(200).send({ message: "données du capteur mises a jour a succès" });

//   Humidity = humidite;
//   //  let plageHumidite = "";

//   // Émettre les données mises à jour via Socket.IO
//   io.emit("update", { humidity: humidite });
//   declencherArrosage(name);
// });

// function declencherArrosage(name) {
//   getSeuilPlanteInfo(name)
//     .then((seuil) => {
//       // Faire quelque chose avec la valeur de seuil
//       console.log(`Le seuil de la plante est : ${seuil}`);
//       // Now that we have the threshold value, we can execute the switch statement
//       switch (true) {
//         case Humidity <= seuil:
//           console.log(humidity);
//           console.log(seuil);
//           test.allumerPompe();
//           break;
//         case Humidity > seuil:
//           test.eteindrePompe();
//           break;
//         default:
//           test.eteindrePompe();
//           console.log("default");
//       }
//     })
//     .catch((error) => {
//       // Gérer les erreurs
//       console.error(error);
//     });
// }

// Export de la fonction arrosage
// module.exports = {
//   declencherArrosage: declencherArrosage,
// };
let name;
app.post("/plante/arrosee", (req, res) => {
  const { Name } = req.body;
  name = Name;
  console.log(Name);
  res.status(200).send({ message: "plante arrosé" });
});

// Modification du point de terminaison pour utiliser Socket.IO
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`server running on port ${port}`);
});
