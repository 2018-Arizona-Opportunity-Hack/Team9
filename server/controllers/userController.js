const bcrypt = require('bcrypt');
const db = require('../config/config');

var apiResult = {};

var user = {
  createUser: function(payload, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) callback(err);

      bcrypt.hash(payload.password, salt, function(err, hash) {
        if (err) callback(err);

        let sql = `INSERT INTO users(username,password) VALUES(?,?)`;
        let user = [payload.username, hash];

        db.query(sql, user, function(error, results) {
          if (error) {
            callback(error);
            console.log('error cannot add create user');
          }

          callback(false, results);
        });

        db.end();
      });
    });
  },

  getUserByEmail: function(payload, callback) {
    var sql = 'SELECT * from users where username=?';

    db.query(sql, [payload.username], function(err, results) {
      if (err) callback(err);

      bcrypt.compare(payload.password, results[0].password, function(err, res) {
        // res == true
        if (err) callback(err);
        callback(false, results[0]);
      });
    });
  },

  removeUser: function(req, res) {
    var sql = 'DELETE FROM users WHERE username = ? ';

    db.query(sql, [req.body.username], function(err, result) {
      if (error) {
        console.log('');
      }
      apiResult.data = { result: 'true' };
      res.json(apiResult);
    });
  },

  changePassword: function(req, res) {
    var sql = 'UPDATE users SET password = ? ';

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      db.query(sql, [hash], function(err, result) {
        if (!err) {
          res.json(apiResult);
        }
      });
    });
  }
};

module.exports = user;
