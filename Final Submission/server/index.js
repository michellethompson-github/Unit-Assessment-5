require('dotenv').config({path: './../.env'})
var massive = require('massive');
var session = require('express-session');

// Destructuring env variables
var { SERVER_PORT, DATABASE_URL, SESSION_SECRET } = process.env;

// Connecting to database on heroku
massive({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
},
{
    scripts: './../db'
}).then(db => {
    app.set("db", db);
    console.log("Database Connected")
})

const express = require('express');
const userCtrl = require('./controllers/user');
const postCtrl = require('./controllers/posts')


const app = express();
app.use(express.json());
// Setting up session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

// Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(SERVER_PORT, _ => console.log(`running on ${SERVER_PORT}`));