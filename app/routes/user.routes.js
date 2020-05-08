module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/users/create', users.create);
  
   app.post('/users/forgotPassword', users.forgotPassword);
   app.post('/users/findUser',users.findUser)
   app.post('/users/login',users.login);


    // Delete a Note with noteId
   // app.delete('/users/:noteId', users.delete);
}