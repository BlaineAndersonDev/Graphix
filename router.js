const express = require('express');

// Create an Express Router to contain all controller 'Routers'.
const router = express.Router();

// 'Mount' a Controller's Router onto the API Router, allowing all routes within to be used.
// I.E. `http://localhost:3001/api/example/...`
router.use('/example', require('./controllers/exampleController.js'));
router.use('/jokes', require('./controllers/jokesController.js'));
router.use('/users', require('./controllers/userController.js'));

// Export the API Router to the App in `./server.js`.
module.exports = router;
