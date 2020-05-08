module.exports = (app) => {
    const teachers = require('../controllers/teacher.controller.js');

    // Create a new Note
    app.post('/teachers', teachers.create);
  

    // Retrieve all Notes
    app.get('/teachers', teachers.findAll);

    // Retrieve a single Note with noteId
    app.get('/teachers/:teachCode', teachers.findOne);

    // Update a Note with noteId
    app.put('/teachers/:noteId', teachers.update);

    // Delete a Note with noteId
    app.delete('/teachers/:techCode', teachers.delete);
}