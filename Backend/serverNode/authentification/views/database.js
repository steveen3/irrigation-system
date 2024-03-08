const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
const bcrypt = require('bcrypt');

// Crée la table "users" si elle n'existe pas déjà
const createTable = () => {
  db.run(`
      CREATE TABLE IF NOT EXISTS utilisateur (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT,
        password TEXT
      )
      
    `);
};
const createTable1 = () => {
  db.run(`
      CREATE TABLE IF NOT EXISTS plante (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        seuil INTEGER,
    

      ),
      
    `);
};
const createTable2 = () => {
  db.run(`      
    CREATE TABLE IF NOT EXISTS humidity (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        degre TEXT,
        date DATE DEFAULT CURRENT_TIMESTAMP
        
      )
    `);
};

// Crée un nouvel utilisateur dans la base de données
function createUser(username, email, hashedPassword) {
  db.get(
    `SELECT * FROM utilisateur WHERE email = ?`,
    [email],
    function (err, row) {
      if (err) {
        console.error(err.message);
      } else if (row) {
        console.log(`Utilisateur avec l'email ${email} existe déjà.`);
      } else {
        db.run(
          `INSERT INTO utilisateur (username, email, password) VALUES (?, ?, ?)`,
          [username, email, hashedPassword], // Utilisez le mot de passe haché au lieu du mot de passe en texte brut
          function (err) {
            if (err) {
              console.error(err.message);
            } else {
              console.log(
                `Utilisateur ${username} avec l'ID ${this.lastID} a été créé.`
              );
            }
          }
        );
      }
    }
  );
}


// Cherche un utilisateur dans la base de données en fonction de l'email
const findOneUser = (username) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM utilisateur WHERE username = ?",
      username,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

function createplante(name, seuil) {
  db.get(`SELECT * FROM plante WHERE name = ?`, [name], function (err, row) {
    if (err) {
      console.error(err.message);
    } else if (row) {
      console.log(`la plante avec le nom ${name} existe déjà.`);
    } else {
      db.run(
        `INSERT INTO plante (name, seuil) VALUES (?, ?)`,
        [name, seuil],
        function (err) {
          if (err) {
            console.error(err.message);
          } else {
            console.log(
              `la plante ${name} avec l'ID ${this.lastID} a été créé.`
            );
          }
        }
      );
    }
  });
}

function createhumidity(nomPlante, degre, date) {
  db.get(
    `SELECT * FROM humidity WHERE nomPlante = ? AND degre = ? AND date = ?`,
    [nomPlante, degre, date],
    function (err, row) {
      if (err) {
        console.error(err.message);
      } else if (row) {
        console.log(
          `Le degré de la plante ${nomPlante} pour la date ${date} existe déjà.`
        );
      } else {
        db.run(
          `INSERT INTO humidity (nomPlante, degre, date) VALUES (?, ?, ?)`,
          [nomPlante, degre, date],
          function (err) {
            if (err) {
              console.error(err.message);
            } else {
              console.log(
                `Le degré ${degre} pour la plante ${nomPlante}, la date ${date} avec l'ID ${this.lastID} a été créé.`
              );
            }
          }
        );
      }
    }
  );
}

function getHumidity(nomPlante) {
  db.all(
    `SELECT * FROM humidity WHERE nomPlante = ?`,
    [nomPlante],
    function (err, rows) {
      if (err) {
        console.error(err.message);
      } else {
        rows.forEach((row) => {
          console.log(
            `Plante: ${row.nomPlante}, Degré: ${row.degre}, Date: ${row.date}`
          );
        });
      }
    }
  );
}

function getSeuilPlanteInfo(name) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT seuil FROM plante WHERE name = ?`,
      [name],
      function (err, row) {
        if (err) {
          reject(err.message);
        } else if (!row) {
          reject(`Aucune plante trouvée avec le nom ${name}.`);
        } else {
          resolve(row.seuil);
        }
      }
    );
  });
}

console.log("SQLite3 Connected");

module.exports = {
  createTable,
  createTable1,
  createTable2,
  createUser,
  createplante,
  findOneUser,
  createhumidity,
  getSeuilPlanteInfo,
  getHumidity,
};
//module.exports = connectDB;
