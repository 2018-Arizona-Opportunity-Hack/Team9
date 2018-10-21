'use strict';
let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController.js');
const jwt = require('jsonwebtoken');

router.post('/create/admin', (req, res, next) => {
  userController.createUser(req.body, function(err, result) {
    if (err) throw err;
    jwt.sign({ username: req.body.username }, process.env.TOKEN_KEY, { expiresIn: '1d' }, function(
      err,
      token
    ) {
      if (err) next(err);
      res.send({ token: token, username: req.body.username });
    });
  });
});

router.post('/authenticate/admin', (req, res, next) => {
  console.log(('BODY', req.body));
  userController.getUserByEmail(req.body, function(err, result) {
    if (err) throw err;
    jwt.sign({ username: req.body.username }, process.env.TOKEN_KEY, { expiresIn: '1d' }, function(
      err,
      token
    ) {
      if (err) next(err);
      res.send({ token: token, username: req.body.username });
    });
  });
});

module.exports = router;
