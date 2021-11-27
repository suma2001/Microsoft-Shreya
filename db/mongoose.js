require('dotenv').config()
const mongoose = require('mongoose');

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},()=>{
    console.log("Connected to Database");
});

mongoose.connection.on('connected', ()=> {
    console.log('Connected to Mongo')
})

mongoose.connection.on('error', (err)=> {
    console.log('Err connecting ', err)
})

module.exports = { mongoose };