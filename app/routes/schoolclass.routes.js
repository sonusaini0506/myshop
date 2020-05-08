module.exports = (app) => {
    const schoolclass = require('../controllers/schoolclass.controller.js');

    // Create a new Note
    app.post('/schoolclass', schoolclass.create);
  

    // Retrieve all Notes
    app.get('/schoolclass', schoolclass.findAll);

    // Retrieve a single Note with noteId
    app.post('/schoolclass/findClass', schoolclass.findOne);

    // Update a Note with noteId
    app.put('/schoolclass/:classCode', schoolclass.update);

    // Delete a Note with noteId
    app.delete('/schoolclass/:techCode', schoolclass.delete);
}