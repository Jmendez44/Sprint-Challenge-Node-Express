const express = require('express');

const actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actions
        .get()
        .then(foundActions => {
            res.json(foundActions)
        })
        .catch(err => {
            res.status(404).json({message: 'no access'});
          });
})


router.post('/', async (req, res) => {
    try {
      const user = await actions.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error adding user',
      });
    }
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actions
      .remove(id)
      .then(userRemoved => {
        if (userRemoved === 0) {
            res.status(404).json({message: 'no access'});
        } else {
          res.json({ success: 'User Removed' });
        }
      })
      .catch(err => {
        res.status(500).json({message: 'no access'});
      });
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    actions
      .update(id, { name })
      .then(response => {
        if (response === 0) {
            res.status(404).json({message: 'no access'});
        } else {
          db.find(id).then(user => {
            res.json(user);
          });
        }
      })
      .catch(err => {
        res.status(500).json({message: 'no access'});
      });
  });



module.exports = router;