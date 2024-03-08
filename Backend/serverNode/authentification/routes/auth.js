const express = require("express");
const router = express.Router();

const {
  register,
  login,
  addPlante,
  addHumidity,
  getSeuilPlante,
  gethumidity,
  arrose,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/plante/arrosage").post(arrose);
router.route("/plante/add").post(addPlante);
router.route("/humidity/add").post(addHumidity);
router.route("/humidity/get").post(gethumidity);
router.route("/plante/seuil").post(getSeuilPlante);
router.route("/login").post(login);

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});
module.exports = router;
