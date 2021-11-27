const express = require('express')
const authenticate = require('../middleware/authenticate')
const { User } = require("../models/user");
const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require('../db/keys');
const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({username: username}, JWT_SECRET)

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username;
            req.session.save();
            res.send({user: user, token:token});
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// Set up a POST route to *create* a user of your web app (*not* a student).
app.post("/users", (req, res) => {
    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        weaknesses: req.body.weaknesses
    });
    // Save the user
    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        const filteredUsers = []
        for (let i = 0; i < users.length; i++) {
            const filteredUser = {
                username: users[i].username,
                rating: users[i].rating
            }
            filteredUsers.push(filteredUser)
        }
        res.send(filteredUsers) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
});

app.patch('/users', (req, res) => {

    const username = req.body.username
    const newpassword = req.body.newpassword

    User.findOneAndUpdate({username : username}, {$set: {password : newpassword}}, {new: true}).then((updatedUser) => {
        if (!updatedUser) {
            res.status(404).send()
        } else {
            res.send(updatedUser)
        } 
    }).catch((error) => {
        log(error)
        res.status(400).send() // bad request for changing the event.
    })
});

app.patch('/users/:username', authenticate, (req, res) => {
    const username = req.params.username
    const newRating = req.body.newRating

    User.findOneAndUpdate({username: username}, {$set: {rating: newRating}}, {new: true})
        .then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send(user)
            }
        })
        .catch((error) => {
            log(error)
            res.status(400).send()
        })
});

// Route to update coins
app.post('/users/coins/:username', authenticate, (req, res) => {
    const username = req.params.username
    const usercoins = req.body.coins
    User.findOneAndUpdate({username: username}, {$inc: {coins: usercoins}}, {new: true})
        .then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send(user)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send()
        })
})

app.get('/users/coins/:username', authenticate, (req, res) => {
    const username = req.params.username

    User.findOne({username: username})
    .then((user) => {
        if(!user) {
            res.status(404).send()
        } else {
            const filteredUser = {
                username: username,
                coins: user.coins
            }

            res.send(filteredUser)
        }
    }).catch((error) => {
        log(error)
        res.status(400).send(error)
    })
});

app.get('/users/:username', (req, res) => {
    const username = req.params.username

    User.findOne({username: username})
        .then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                const filteredUser = {
                    username: user.username,
                    rating: user.rating
                }
    
                res.send(filteredUser)
            }
        })
        .catch((error) => {
            log(error)
            res.status(400).send(error)
        })
});

module.exports = app;