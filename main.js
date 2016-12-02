var express = require('express');
var app = express();
var models = require('./mongoos');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var patients = require('./routes/patients');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/patients', patients);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
