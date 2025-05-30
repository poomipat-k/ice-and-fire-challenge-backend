const express = require('express');

const { signup } = require('./handler/auth');

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello World")
})

app.get("/auth/signup", (req, res) => {
       return res.send("signup")
})

app.listen(8080, function() {
    console.log('Listening on port 8080')
})