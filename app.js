require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const multer = require('./middleware/multer.config'); 
const bookRoutes = require ('./routes/books');
const userRoutes = require ('./routes/user');
const cors = require('cors');
const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use ('/api/books', bookRoutes);
app.use ('/api/auth', userRoutes)

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.aoaz7ds.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("Connecté à la base de données MongoDB !"))
.catch(error => console.error("Erreur de connexion à la base de données", error));


module.exports = app;
