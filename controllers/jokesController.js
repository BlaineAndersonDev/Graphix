const knex = require('../knexconfig.js');
const cloudinary = require('cloudinary');
const router = require('express').Router();

cloudinary.config({
    cloud_name: 'brawnimages',
    api_key: '926474368348286',
    api_secret: 'gM75UVb4meYzSR4YWG0CdEZeTcg'
});

router.get('/', async (req, res) => {
  console.log(' >>> Entered Route GET `/api/jokes/`')
  const readResults = await knex('jokes')
    .select('*')
    .orderBy('id', 'desc')
    .catch((err) => {
      console.log(err)
    });
  return res.send(readResults);
});

router.post('/create', async (req, res) => {
  console.log(' >>> Entered Route POST `/api/jokes/create`')
  console.log(' Query: ' + Object.keys(req.query))
  const createResults = await knex('jokes')
    .insert({
      author: req.query.author,
      body: req.query.body,
      imagePublicId: req.query.imagePublicId
    })
    .returning('*')
    .catch((err) => {
      console.log(err)
    });
  res.send(createResults);
});

router.put('/update/:id', async (req, res) => {
  console.log(' >>> Entered Route PUT `/api/update/:id`')
  console.log(' Params: ' + Object.keys(req.params))
  console.log(' Query: ' + Object.keys(req.query))
  const updateResults = await knex('jokes')
    .where({ id: req.params.id })
    .update({
      author: req.query.author,
      body: req.query.body,
      imagePublicId: req.query.imagePublicId
    })
    .returning('*')
    .catch((err) => {
      console.log(err)
    });
  return res.json(updateResults);
});

router.delete('/delete/:id', async (req, res) => {
  console.log(' >>> Entered Route DELETE `/api/jokes/delete`')
  console.log(' Params: ' + Object.keys(req.params))
  const deleteResults = await knex('jokes')
    .where({ id: req.params.id })
    .del()
    .catch((err) => {
      console.log(err)
    });
    return res.json(deleteResults);
});

router.post('/cloudinaryDelete', async (req, res) => {
  console.log(' >>> Entered Route GET `/api/jokes/cloudinaryDelete`')
  console.log(' Params: ' + Object.keys(req.params))
  console.log(' Query: ' + Object.keys(req.query))
  console.log(' Query: ' + req.query.publicId)
  const result = cloudinary.v2.uploader.destroy(
    req.query.publicId, {
      invalidate: true
    }, (error, result) => {
      if (error) {
        console.log('Error: ' + JSON.stringify(error))
      } else {
        console.log(result)
      }
    }
  );
  return res.send(result);
});

module.exports = router;
