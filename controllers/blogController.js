const knex = require('../knexconfig.js');
const router = require('express').Router();

// ====== Routes ======
router.get('/', async (req, res) => {
  console.log(' >>> Entered Route GET `/api/blogs/`')
  const readResults = await knex('blogs')
    .select('*')
    .catch((err) => {
      console.log(err)
    });
  return res.send(readResults);
});

router.get('/blogs', async (req, res) => {
  const results = await knex.select().table('blogs');
  return res.json(results)
});
router.post('/blog', async (req, res) => {

});
router.put('/blog', async (req, res) => {

});
router.delete('/blog', async (req, res) => {

});

// Export routes to `./router.js`
module.exports = router;
