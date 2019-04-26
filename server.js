const express = require("express");
const cors = require("cors");
const bodyParser= require("body-parser");
const app = express();
const mongoose = require('mongoose');

const passport = require('passport');

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb://localhost:3000/finalproject'
mongoose
.connect(mongoURI, {useNewUrlParser: true})
.then(() => console.log("MongoDB connect"))
.catch(err => console.log(err))

//Routes
var Users = require('./routes/users')
app.use('/users', Users)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server started on" ,PORT));