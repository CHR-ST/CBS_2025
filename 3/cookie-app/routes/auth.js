var express = require('express');
var router = express.Router();

/* sætter express-session cookie for bruger */
router.post('/login', async (req, res) => {
    req.session.user = req.body; // Simpel brugerobjekt i JSON
    res.status(200).json({ message: 'User logged in!' });
});

/* sletter express-session cookie */
router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'User logged out!' });
});

/* beskyttet endpoint som kræver at brugeren er logget ind med session */
router.get('/protected', async (req, res) => {
    if (req.session.user) {
        res.status(200).json({ message: `Welcome ${req.session.user.username}!` });
    } else {
        res.status(401).json({ message: 'Unauthorized access!' });
    }
});

module.exports = router;