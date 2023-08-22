require("dotenv").config();
const mongoose = require('mongoose');
const url = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.aoaz7ds.mongodb.net/test?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connecté à la base de données MongoDB !");
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
  }
}

connect(); 


module.exports = {};
