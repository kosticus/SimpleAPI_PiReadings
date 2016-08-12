var express     = require('express');
var Path        = require('path');
var bodyParser  = require('body-parser');

var port        =     process.env.PORT || 4000;
var env         = process.env.NODE_ENV || 'development';

var config      = require('../knexfile');
var db          = require('knex')(config[env]);

var app         = express();

// Parse request body as JSON
app.use(bodyParser.json());

// Create schema when server is first started
// Assuming serial and reading values are only numbers - change to varchar for alphanumeric
db.schema.createTableIfNotExists('readings', function (table) {
  table.increments('id').primary();
  table.integer('serial_id').notNullable();
  table.integer('reading_number').notNullable();
  table.timestamp('timestamp').notNullable();
})
.then(function (result) {
  console.log('Successfully applied schema.');

  // db.destroy();
})
.catch(function (error) {
  console.log('Warning: Database Error', error);
});

////// ENDPOINTS //////
// Get count of records from DB
app.get('/count', function (req, res) {
  db('readings').count('serial_id')
  .then(function (count) {
    res.status(201).send(JSON.stringify(count[0]));
  })
  .catch(function (err) {
    res.status(500).send(JSON.stringify(err));
  });
});

// Insert serial number, reading number, and timestamp into DB
// ** When this endpoint is hit with no queries, serve HTML file (for testing)
app.get('/', function (req, res) {
  var serial = req.query.serial;
  var reading = req.query.reading;

  // Can format date differently if needed
  var timeNow = new Date();

  // Check if serial and reading exist (would not exist when first loading page)
  if (serial && reading) {
    db('readings')
      .insert({
        serial_id: serial,
        reading_number: reading,
        timestamp: timeNow,
      })
      .then(function () {
        res.status(201).send(JSON.stringify('Successfully inserted into database'));
      })
      .catch(function (err) {
        res.status(500).send(JSON.stringify(err));
      });
  } else {
    // Send html (just for testing)
    res.status(200).sendFile(Path.resolve(__dirname, '../client/public/index.html'));
  }
});

// Catch-all route
app.get('/*', function (req, res) {
  res.status(404).send(JSON.stringify('Uh oh'));
});

app.listen(port);
console.log('Listening on port: ', port);
