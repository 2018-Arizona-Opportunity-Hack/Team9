'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const jwt = require('jsonwebtoken');
const client = require('twilio')(
  'AC62da8324816413183f116e44edf29fb8',
  'ab782b73f24fabd30c5d18ed1b6656d8'
);

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
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // const split = body.split('\n');
    // const slim = split.splice(5);
    // const slice = slim.slice(0, slim.length - 3);

    const contacts = ['9283152886', '6024814816', '4806166117', '7204162518', '5189616102'];

    contacts.forEach(contact => {
      client.messages.create({
        body: 'Hello World',
        from: '+14809990463',
        to: contact
      });
    });
  });
});

module.exports = router;
