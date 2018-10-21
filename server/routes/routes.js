'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const multer = require('multer');
const jwt = require('jsonwebtoken');

router.post('/create/admin', (req, res, next) => {
  if (!req.body.password || !req.body.username) {
    res.status(400).send();
  } else {
    userController.createUser(req.body, function(err, result) {
      if (err) next(next);
      else {
        jwt.sign(
          { username: req.body.username },
          process.env.TOKEN_KEY,
          { expiresIn: '1d' },
          function(err, token) {
            if (err) next(err);
            else {
              res.send({ token: token, username: req.body.username });
            }
          }
        );
      }
    });
  }
});

router.post('/authenticate/admin', (req, res, next) => {
  if (!req.body.password || !req.body.username) {
    res.status(400).send();
  } else {
    userController.getUserByEmail(req.body, function(err, result) {
      if (err) next(err);
      else {
        jwt.sign(
          { username: req.body.username },
          process.env.TOKEN_KEY,
          { expiresIn: '1d' },
          function(err, token) {
            if (err) next(err);
            else {
              res.send({ token: token, username: req.body.username });
            }
          }
        );
      }
    });
  }
});

router.post('/send/message', (req, res, next) => {
  console.log(req.body);
  // if (!req.body.message || !req.body.file) {
  //   res.status(400).send();
  // } else {
  //   res.send(req);
  // }
});

module.exports = router;
