const router = require('express').Router();
const Users = require('./users-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  console.log(user)
const payload = {
  username: user.username,
  id: user.id,
};
const options = {
  expiresIn: '1d',
};
return jwt.sign(payload,'pennutbutterSprintTime', options);
// or you can storage your secrete in a  process.env.JWT_SECRET || 'pennutbutterSprintTime';
}


router.post('/register', (req, res) => {
  // implement registration
  const { username, password } = req.body;
  Users.insert({ username, password: bcrypt.hashSync(password, 8) })
    .then(id => {
      res.status(201).json({ message: "User registered", id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "there was a problem  registering the user" });
    });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;
  Users
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "you are logged in!",
          token
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error logging in user" });
    });
});

module.exports = router;
