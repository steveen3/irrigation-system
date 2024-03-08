const User = require("../models/User");
const plante = require("../models/plante");
const humidity = require("../models/humidity");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require('bcrypt');

const {
  createUser,
  findOneUser,
  createplante,
  getSeuilPlanteInfo,
  createhumidity,
  getHumidity,
} = require("../views/database");
const { declencherArrosage } = require("../../../server");

exports.arrose = async (req, res, next) => {
  const { nomPlante } = req.body;
  console.log(nomPlante);
  try {
    declencherArrosage(nomPlante);
    res.status(200).send({ message: "arrosage effectué" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username + " " + email + " " + password);
  try {
    // Générer le hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // Le deuxième argument est le coût du hachage, plus il est élevé, plus le hachage est sécurisé mais plus il est lent

    // Enregistrer l'utilisateur avec le mot de passe haché
    createUser(username, email, hashedPassword);
    
    res.status(201).send({ message: "User registered" });
  } catch (error) {
    next(error);
  }
};

// creation d'une plante
exports.addPlante = async (req, res, next) => {
  const { name, seuil } = req.body;
  console.log(name + " " + seuil);
  try {
    createplante(name, seuil);
    res.status(201).send({ message: "plante created" });
  } catch (error) {
    next(error);
  }
};
// recuperer le seuil d'une plante
exports.getSeuilPlante = async (req, res, next) => {
  const { name } = req.body;
  //console.log(name);
  try {
    getSeuilPlanteInfo(name);
    res.status(200).send({ message: "seuil plante recuperer" });
  } catch (error) {
    next(error);
  }
};

exports.addHumidity = async (req, res, next) => {
  const { nomPlante, degre, date, heure } = req.body;
  console.log(degre + " " + date + " " + heure);
  try {
    createhumidity(nomPlante, degre, date, heure);
    res.status(200).send({ message: "humidity add" });
  } catch (error) {
    next(error);
  }
};

exports.gethumidity = async (req, res, next) => {
  const { nomPlante } = req.body;
  console.log(nomPlante);
  try {
    getHumidity(nomPlante);
    res.status(200).send({ message: "humidité recuperée" });
  } catch (error) {
    next(error);
  }
};

//authentification

// Assume matchPasswords method compares passwords
const matchPasswords = async (enteredPassword, savedPassword) => {
  return enteredPassword === savedPassword;
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return next(new ErrorResponse("Please provide username and password", 400));
  }
  try {
    const user = await findOneUser(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await matchPasswords(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    console.log("Login success");
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
