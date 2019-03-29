const express = require("express");

const actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  actions
    .get()
    .then(foundActions => {
      res.json(foundActions);
    })
    .catch(err => {
      res.status(404).json({ message: "no access" });
    });
});

router.post("/", async (req, res) => {
  try {
    const action = await actions.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No project with that id"
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(actionRemoved => {
      if (actionRemoved === 0) {
        res.status(404).json({ message: "no access" });
      } else {
        res.json({ success: "Action Removed" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "no access" });
    });
});

router.put("/:id", async (req, res) => {
  const { project_id, description, notes, completed } = req.body
  const { id } = req.params;

  if (!actions.get(req.params.id)) {
    res.status(404).json({ error: 'no action with that id' })
  } else if (!project_id && !description && !notes && !completed) {
    res.status(400).json({ error: 'no data to upldate action provided' })
  } else {
    try {
      const updatedAction = await actions.update(req.params.id, req.body)
      res.status(200).json(updatedAction)
    } catch (error) {
      res.status(500).json({ error: 'failed to update action in actions' })
    }
  }
})

module.exports = router;
