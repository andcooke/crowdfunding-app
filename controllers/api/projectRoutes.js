const router = require('express').Router();
const withAuth = require ('../../utils/auth')
const { Project } = require('../../models');

//get all
router.get('/', withAuth, async (req, res) => {
  try { 
    const projectData = await Project.findAll();
    res.status(200).json(projectData)
  } catch {
    res.status(500).json(err)
  }
});

//get by id
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);
    res.status(200).json(projectData);
  } catch {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
