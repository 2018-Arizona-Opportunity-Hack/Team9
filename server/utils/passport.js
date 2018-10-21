const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../controllers/userController');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('bearer');
  opts.secretOrKey = process.env.TOKEN_KEY;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log(jwt_payload);
      User.getUserByEmail(jwt_payload.result.id)
        .then(res => {
          return done(null, res);
        })
        .catch(err => {
          console.log('err', err);
          return done(null, false);
        });
    })
  );
};
