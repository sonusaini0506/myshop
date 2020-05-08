module.exports = (app) => {
    const numbers = require('../controllers/createNumber.controller.js');

    // Create a new Note
    app.post('/numbers', numbers.create);
  

    // Retrieve all Notes
    app.post('/numbers/findNumber', numbers.findNumber);

    
}