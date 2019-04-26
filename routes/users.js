const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../models/users")
users.use(cors());

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const usersData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    Users.findOne({
        email: req.body.email
    })
        .then(users => {
            if (!users) {
                bcrypt.hash(req.body.password, 12, (err, hash) => {
                    usersData.password = hash
                    Users.create(usersData)
                        .then(users => {
                            res.json({ status: users.email + "is registered!" })
                        })
                        .catch(err => {
                            res.send("Error" + err)
                        })
                })
            } else {
                res.json({ err: "User already exists" })
            }
        })
        .catch(err => {
            res.send("error:" + err)
        })
})
users.post("/login", (req, res) => {
    Users.findOne({
        email: req.body.email
    })
        .then(users => {
            if (users) {
                if (bcrypt.compareSync(req.body.password, users.password)) {

                    const payload = {
                        _id: users_id,
                        username: users.username,
                        email: users.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ err: "User does not exist" })
                }
            } else {
                res.json({ err: "User does not exist" })
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

users.get("/profile", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY)
    Users.findOne({
        _id: decoded._id
    })
        .then(users => {
            if (users) {
                res.json(users)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send("error" + err)
        })
})


module.exports = users
