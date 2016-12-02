var mongoose = require('mongoose');

mongoose.connect('mongodb://tommy:iitkharagpur@ds017736.mlab.com:17736/yorkerdb');
var db = mongoose.connection;
db.on('error', function(error){
  console.log('shit');
  console.log(error);
});
db.once('open', function() {
  console.log('Connected to MongoDB server');
});
