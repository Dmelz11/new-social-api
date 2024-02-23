const {connect, connection} = require('mongoose');
//wrapping mongoose package around connection to MongoDb
connect('mongodb://127.0.0.1:27017/newSocial');
//exporting connection
module.exports = connection;