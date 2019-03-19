const knex = require('../knexconfig.js');
const router = require('express').Router();

// ====== Routes ======
router.get('/', async (req, res) => {
  const results = await knex.select().table('users');
  return res.json(results);
}),

router.get('/users', async (req, res) => {
  const results = await knex.select().table('users');
  return res.json(results)
});
router.post('/users', async (req, res) => {

});
router.put('/users', async (req, res) => {

});
router.delete('/users', async (req, res) => {

});

// Export routes to `./router.js`
module.exports = router;
