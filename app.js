const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
const bookRoutes = require ('./Routes/books');
const userRoutes = require ('./Routes/user')




const app = express();
app.use(express.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use (bodyParser.json ());
app.use ('/api/books', bookRoutes);
app.use ('/api/auth', userRoutes)



module.exports = app;


mongoose.connect('mongodb+srv://Manel:HmdHzEwkQ3v2Zux0@cluster0.aoaz7ds.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));