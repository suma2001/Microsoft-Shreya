'use strict';
require('dotenv').config()
const log = console.log;
log('Express server');

const express = require('express');
const app = express();
const webpush = require("web-push");


// mongoose and mongo connection
const { mongoose } = require('./db/mongoose');
mongoose.set('useFindAndModify', false); // for some deprecation issues

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const session = require("express-session"); 
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "raymanshay",
        resave: true,
        saveUninitialized: true,
        cookie: {
            path: '/',
            expires: 1800000,
            httpOnly: true
        }
    })
);

app.use(require('./routes/user'))
app.use(require('./routes/event'))


// Push notifications
const publicVapidKey ="BKbKEJ1rJqvumgXg0n0WEDebYoNvNODZV3iqFpVgsJEbufOIZ8Yd76TBxWr_afLY3lajRFK3Z0QfVN7wA8R0H64";
const privateVapidKey = "f40t4rkDm5uwpdP40f_HF1Ke3_5ddg_i61f23P8WqaE";
webpush.setVapidDetails("mailto:sumashreya72@gmail.com",
publicVapidKey,privateVapidKey);

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + '/frontend/build'));

// // All routes other than above will go to index.html
app.get("*", (req, res) => {
     res.sendFile(__dirname + '/frontend/build/index.html');
 });

const port = process.env.PORT;

// server static assets if in production
if(process.env.NODE_ENV === 'production'){    
    app.use(express.static('frontend/build'))  // set static folder 
    //returning frontend for any route other than api 
    app.get('*',(req,res)=>{     
        res.sendFile (path.resolve(__dirname,'frontend','build',         
                      'index.html' ));    
    });
}

app.listen(port, () => {
    log(`Listening on port ${port}...`)
});

// app.use('/', express.static(path.join(__dirname, '/frontend/build')));

