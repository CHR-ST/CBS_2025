var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// routers
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var cookieRouter = require('./routes/cookie');
var authRouter = require('./routes/auth');
var middlewareRouter = require('./routes/middleware');

var app = express();

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express-session middleware
app.set('trust proxy', 1); // hvis bagved en proxy (for eksempel nginx)
app.use(session({
    secret: 'mwndigi', // random nøgle til at signere cookie ID
    resave: false, // lagrer ikke hvis session ikke er ændret
    saveUninitialized: false, // lagrer ikke session før den er modificeret
    cookie: {
        httpOnly: true,      // forhindrer client-side JS fra at tilgå cookie
        sameSite: 'strict',  // forhindrer Cross-Site Request Forgery (CSRF)
        maxAge: 24 * 60 * 60 * 1000, // sætter cookie til at udløbe efter 1 dag
        // secure: true,        // sikrer cookies kun sendes over HTTPS. Prøv at kommentere ind
    }
}));

// HTTP request logging middleware
app.use((req, res, next) => {
    console.log("----- HTTP Request -----");
    console.log("method: ", req.method); // HTTP metode
    console.log("url:", req.originalUrl); // URL
    console.log("headers:", req.headers); // headers
    console.log("ip:", req.ip); // IP adresse
    console.log("body:", req.body); // body
    console.log("------------------------");
    next();
});

// routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/cookie', cookieRouter);
app.use('/auth', authRouter);
app.use('/middleware', middlewareRouter);

module.exports = app;