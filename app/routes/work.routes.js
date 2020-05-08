module.exports = (app) => {
    const work = require('../controllers/work.controller.js');

    // Create a new Note
    app.post('/work', work.create);
  
    app.post('/work/findAll', work.findAll);
   // Retrieve a single Note with noteId
    app.post('/work/find', work.findOne);

    // Update a Note with noteIdsaveMedia
    app.post('/work/update', work.update);
    app.post('/work/saveMedia', work.saveMedia);
    app.post('/work/findWork', work.findWork);

    // Delete a Note with noteId
    app.post('/work/delete', work.delete);
}