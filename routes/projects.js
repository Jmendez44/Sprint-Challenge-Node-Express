const express = require('express');

const projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projects
        .get()
        .then(foundProjects => {
            res.status(200).json(foundProjects)
        })
        .catch(err => {
            res.status(404).json({message: 'no access'});
          });
})

router.post('/', async (req, res) => {
    try {
      const user = await projects.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error adding user',
      });
    }
  });




  router.get('/:project_id', async (req, res) => {
    try {
      const id = await projects.getProjectActions(req.params.projectId);
  
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({ message: 'id not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the id',
      });
    }
  });




  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projects
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
    projects
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