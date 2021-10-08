const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

// Connexions à mongoDB
mongoose.connect('mongodb+srv://Max:7559mh05@cluster0.xketd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement de express
const app = express();

app.use('/api/auth', userRoutes);

module.exports = app;