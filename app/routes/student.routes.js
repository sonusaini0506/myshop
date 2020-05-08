module.exports = (app) => {
    const student = require('../controllers/student.controller.js');

    // Create a new Note
    app.post('/student', student.create);
  
// test 
    // Retrieve all Notes
    app.get('/student', student.findAll);

    // Retrieve a single Note with noteId
    app.post('/student/login', student.findOne);

    // Update a Note with noteId
    app.put('/student/:stuCode', student.update);

    // Delete a Note with noteId
    app.delete('/student/:stuCode', student.delete);
}