const express = require('express')
var cookieParser = require('cookie-parser');
const path = require("path");
 
const app = express()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// User objekt
const users = [
  { id: 1, username: 'mwndigi', password: 'minhundheddertorben' },
  { id: 2, username: 'hildigi', password: 'pippilangstrump' }
];

// index route
app.get('/', (req, res) => {
    // Cache-Control header for at undgå caching
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.sendFile(path.join(__dirname, "/index.html"));
})

// POST login
app.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.cookie('loggedIn', 'true');
    res.cookie('id', user.id);
    res.status(200).json({ message: 'Du er nu logget ind med id ' + user.id + '.' });
  } else {
    res.status(401).json({ message: 'Forkert brugernavn eller adgangskode.' });
  }
});

// GET protected
app.get('/protected', (req, res) => {
  if (req.cookies && req.cookies.loggedIn === 'true') {
    res.status(200).json({ message: 'Du har adgang til den beskyttede side med id ' + req.cookies.id + '.' });
  } else {
    res.status(401).json({ message: 'Du skal logge ind for at få adgang.' });
  }
});

app.listen(3001);