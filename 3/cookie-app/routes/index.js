var express = require('express');
var path = require('path');
var router = express.Router();

/* GET forside */
router.get('/', async (req, res) => {
  res.render('index', { title: 'Cookie App' });
});

router.get('/image', async (req, res) => {  
  // Sæt cache-control og pragma headers for at forhindre caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.sendFile(path.join(__dirname, "../public/images", "cbs.jpeg"));
});

module.exports = router;