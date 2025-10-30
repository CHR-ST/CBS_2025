const express = require('express')
const path = require("path");
const responseTime = require('response-time')
 
const app = express()
 
app.use(responseTime())
 
// index route
app.get('/', (req, res) => {
    // Cache-Control header for at undgå caching
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Set-Cookie', 'cookieName=cookieValue');
    res.sendFile(path.join(__dirname, "/index.html"));
})

// image route
app.get('/image', (req, res) => {
    // Cache-control og pragma headers for at undgå caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.sendFile(path.join(__dirname, 'image.jpeg'));
  });

app.listen(3000);