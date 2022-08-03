
const router = require('express').Router();

router.get('/', async (req, res) => {
  try { 

    //retrieve project information
    const projectData = await Project.findAll();
    console.log(projectData);

    //serialize the data
    const project = projectData.get({ plain: true });

    //pass serialied data with page and data    
    res.render('homepage', project);

  } catch {
    res.status(500).json(err)
  }


});

