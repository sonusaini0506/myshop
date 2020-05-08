module.exports = (app) => {
    const games = require('../controllers/game.controller.js');

    // Create a new user
    app.post('/games/create', games.create);
  
   app.post('/games/gameupdate', games.gameupdate);
   app.post('/games/findGame',games.findGame)
   app.post('/games/dashboard',games.dashboard);
   


    // Delete a Note with noteId
   // app.delete('/users/:noteId', users.delete);
}