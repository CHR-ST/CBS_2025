var express = require('express');
var router = express.Router();
var users = require('../db/users');

/* GET alle brugere */
router.get('/', async (req, res) => {
  res.json(users);
});

/* GET brugere ud fra brugernavn */
router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const user = users.find((u) => u.username === username);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  res.json(user);
});

/* POST lav en ny bruger */
router.post('/create', async (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

/* PUT opdater bruger ud fra brugernavn */
router.put('/update/:username', async (req, res) => {
    const username = req.params.username;
    const updatedData = req.body;
    const userIndex = users.findIndex((u) => u.username === username);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found!' });
    }

    users[userIndex] = { ...users[userIndex], ...updatedData };
    res.json(users[userIndex]);
});

/* DELETE slet bruger ud fra brugernavn */
router.delete('/delete/:username', async (req, res) => {
    const username = req.params.username;
    const userIndex = users.findIndex((u) => u.username === username);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found!' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'User deleted!' });
});

module.exports = router;