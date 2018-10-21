const bcrypt = require('bcrypt');
const db = require('../config/config');

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

      if (!results.length) {
        callback({ message: 'User not found', status: 404 });
        return;
      } else {
        bcrypt.compare(payload.password, results[0].password, function(err, res) {
          if (err) callback(err);
          else if (!res) callback({ message: 'Username or password is incorrect', status: 404 });
          else {
            callback(false, results[0]);
          }
        });
      }
    });
  },

  // removeUser: function(payload, callback) {
  //   var sql = 'DELETE FROM users WHERE username = ? ';

  //   db.query(sql, [req.body.username], function(err, result) {
  //     apiResult.data = { result: 'true' };
  //     res.json(apiResult);
  //   });
  // },

  changePassword: function(payload, callback) {
    var sql = 'UPDATE users SET password = ? ';

    bcrypt.hash(payload, saltRounds, function(err, hash) {
      db.query(sql, [hash], function(err, result) {
        if (err) callback(err, 500);
        else {
          callback(false, result);
        }
      });
    });
  }
};

module.exports = user;
