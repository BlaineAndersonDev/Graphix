const knex = require('../knexconfig.js');

// Create a controller for exampleController.
const router = require('express').Router();

// Routes:
router.get('/', async (req, res) => {
  // Knex cheatsheet: https://devhints.io/knex

  // Knex has simple . notations to select information simply.
  const easyResults = await knex.select().table('users');

  // Knex also allows you to manually write SQL queries as well.
  const rawResults = await knex.raw('\
    SELECT * \
    FROM users \
  ');
  // But they have to be adjusted for human reading.
  let rawResultsCleaned = [];
  for (let i in rawResults.rows) {
    rawResultsCleaned.push(rawResults.rows[i])
  }

  // A data test showing:
    // Basic Object information,
    // Dotenv hidden data implementation,
    // Knex .notations results,
    // Knew raw SQL results (after cleanup).
  const cities = [
    {name: 'New York City', population: 8175133},
    {name: 'Los Angeles',   population: 3792621},
    {name: 'Chicago',       population: 2695598},
    {
      name: 'TEST_DATA',
      population: process.env.TEST_DATA
    },
    {
      name: 'easyResults',
      population: easyResults
    },
    {
      name: 'rawResultsCleaned',
      population: rawResultsCleaned
    }
  ]
  res.json(cities)
});

// All routes encapsulated into a single function
router.route('/data')
  .get(function(req,res){
    knex.select().table('users')
  .then(function(collection){
    res.json({
      error: false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error: true,
      data:{
        message:err.message
      }
    })
  })
});

// Basic Promise Based CRUD setup:
  // req.query | req.params | req.body Explination.
  // https://softwareengineering.stackexchange.com/a/331055

// KNEX docs: https://knexjs.org/
// KNEX common commands:
  // .select()                            |       SELECT
  // .table('<TableName>')                |       FROM/INTO
  // .returning('<DataToReturn>')         |       RETURNING
  // .where({ key:value })                |       WHERE
  // .insert({ key:value })               |       INSERT
  // .update({ key:value })               |       UPDATE
  // .del()                               |       DELETE
  // .catch((err) => {console.log(err)})  |       Error Catching

// GET (Read):
router.get('/titles', async (req, res) => {
  console.log(' >>> Entered Route GET `/api/example/titles`')
  const readResults = await knex('titles')
    .select('*')
    .catch((err) => {
      console.log(err)
    });
  return res.json(readResults);
});
// POST (Create):
router.post('/titles', async (req, res) => {
  console.log(' >>> Entered Route POST `/api/example/titles`')
  console.log(' Query: ' + Object.keys(req.query))
  const createResults = await knex('titles')
    .insert({
      name: req.query.name
    })
    .returning('*')
    .catch((err) => {
      console.log(err)
    });
  res.send(createResults);
});
// PUT (Update):
router.put('/titles/:id', async (req, res) => {
  console.log(' >>> Entered Route PUT `/api/example/titles`')
  console.log(' Params: ' + Object.keys(req.params))
  console.log(' Query: ' + Object.keys(req.query))
  const updateResults = await knex('titles')
    .where({ id: req.params.id })
    .update({
      name: req.query.name
    })
    .returning('*')
    .catch((err) => {
      console.log(err)
    });
  return res.json(updateResults);
});
// DELETE (Delete):
router.delete('/titles', async (req, res) => {
  console.log(' >>> Entered Route DELETE `/api/example/titles`')
  console.log(' Params: ' + Object.keys(req.params))
  const deleteResults = await knex('titles')
    .where({ id: req.query.id })
    .del()
    .catch((err) => {
      console.log(err)
    });
  return res.json(`Title Id ${req.query.id} Deleted Succussfully!`);
});

// Export routes to `./router.js`
module.exports = router;
