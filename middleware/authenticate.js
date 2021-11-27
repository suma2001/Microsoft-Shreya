const jwt = require('jsonwebtoken')
// const {JWT_SECRET} = require('../db/keys')
const { User } = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for authentication of resources
// Taken from class express-authentication example
const authenticate = (req, res, next) => {
    const {authorization} = req.headers
    // authorization ===> Bearer <token>..... so on replacing Bearer.. we will get the token
    if(!authorization){
        return res.status(401).json({error: "You must be signed in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            const payload = jwt.verify(token, JWT_SECRET, {ignoreExpiration: true} );
            const {_id} = payload
            User.findById(_id).then(userData => {
                req.user = userData
                next()
            })
        }
        else {
            const {_id} = payload
            User.findById(_id).then(userData => {
                req.user = userData
                next()
            })
        }
    })
}

module.exports = authenticate;