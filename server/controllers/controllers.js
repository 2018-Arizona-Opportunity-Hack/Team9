

module.exports.userAuthenticate =  function(req, res){

    let data = {
        username: req.body.username,
        password: req.body.password
    };

      
      connection.connect(function(err){
          if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
          console.log('connected as id ' + connection.threadId);

      });
      
      connection.query('SELECT username,password from users', function(err, rows, fields) {
        if (!err)
          console.log('The solution is: ', rows);
        else {

            connection.release();

        }
        return next(new errors.InternalError(err.message));
      });
      
  

      connection.end(function(err) {
          if(err) {
            console.error('error connecting: ' + err.stack);
            return
          }
          console.log('connected is closed ');
      });

    User.findOne({ username: data.username }).exec(function(err, user){
      let token;

        if(err) {
          console.error(err.message);
          return next(new errors.InternalError(err.message));
          next();
           // return res.json({error: true});
        }
        if(!user) {
            return res.status(404).json({'message': 'User not found!'});
        }
        else {
          if (!user.comparePassword(data.password)) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          }
        }

        const payload = {
          username : user.username
        };

        try {
          token = jwt.sign( payload, config.jwt_secret, { expiresIn: 1440 /*expires in 1 hour*/ });
          console.log('token'+ token);
        } catch (error) {
          console.error(error);
        }

        res.json({ sucess : true,
          message: 'Token created',
          token: token,
          username: user.username
        });
    })
};