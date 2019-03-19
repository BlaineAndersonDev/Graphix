const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const knex = require('./knexconfig.js');
const dotenv = require('dotenv');
const generatePassword = require('password-generator');

// Allows the API to take requests on the given `port`.
const port = process.env.PORT || 3001;

// Create the app using express.
const app = express();

// Allows express to Parse `request.body`.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port), () => {
  console.log(`Listening on ${port}`)
};

// 'Import' & 'Mount' the router into the app.
app.use('/api', require('./router.js'));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Exports the `Express App` to be used elsewhere in the project.
module.exports = app;
