var mysql = require('mysql');
    port = process.env.PORT || 4205;

if (port === 4205) {

    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'your_api',
        insecureAuth: true
    });
} else {

   //same as above, with live server details
}

connection.connect(function(err){
    if(err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);

});

connection.end(function(err) {
    if(err) {
      console.error('error ending db connection: ' + err.stack);
      return
    }
    console.log('connection has been closed...');
});


module.exports = connection;