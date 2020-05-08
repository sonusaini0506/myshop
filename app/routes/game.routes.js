module.exports = (app) => {
    const games = require('../controllers/game.controller.js');

    // Create a new user
    app.post('/games/create', games.create);
  
   app.post('/games/gameupdate', games.gameupdate);
   app.post('/games/dashboard',games.dashboard);
   app.post('/games/findUserGame',games.findUserGame);
   


    // Delete a Note with noteId
   // app.delete('/users/:noteId', users.delete);
}