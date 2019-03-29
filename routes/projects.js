const express = require("express");

const projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  projects
    .get()
    .then(foundProjects => {
      res.status(200).json(foundProjects);
    })
    .catch(err => {
      res.status(404).json({ message: "no access" });
    });
});

router.post("/", async (req, res) => {
  try {
    const project = await projects.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding project"
    });
  }
});

router.get("/actions/:projectId", (req, res) => {
  const { projectId } = req.params;
  projects
    .getProjectActions(projectId)
    .then(id => {
      if (id === 0) {
        res.status(500).json({ message: "no access" });
      }
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .remove(id)
    .then(userRemoved => {
      if (userRemoved === 0) {
        res.status(404).json({ message: "no access" });
      } else {
        res.json({ success: "User Removed" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "no access" });
    });
});

router.put("/:id", async (req, res) => {
  const { name, description, completed } = req.body;

  if (!projects.get(req.params.id)) {
    res.status(404).json({ error: "no project with that id" });
  } else if (!description && !name && !completed) {
    res.status(400).json({ error: "no update information provided" });
  } else {
    try {
      const updatedProject = await projects.update(req.params.id, req.body);
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: "failed to update project in database" });
    }
  }
});

module.exports = router;
