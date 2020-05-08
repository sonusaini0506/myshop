module.exports = (app) => {
    const comments = require('../controllers/comment.controller.js');

    // Create a new Note
    app.post('/comments', comments.create);
  

    // Retrieve all Notes
    app.post('/comments/findAll', comments.findAll);

    
}