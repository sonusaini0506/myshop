module.exports = (app) => {
    const games = require('../controllers/game.controller.js');

    // Create a new user
    app.post('/games/create', games.create);
  
   app.post('/games/gameupdate', games.gameupdate);
   app.post('/games/dashboard',games.dashboard);
   app.post('/games/findUserGame',games.findUserGame);
   app.post('/games/findGame',games.findGame);
   app.post('/games/findGameListAll',games.findGameListAll);
   app.post('/games/findGameListToday',games.findGameListToday);
   app.post('/games/findGamePayAmount',games.findGamePayAmount);
   


    // Delete a Note with noteId
   // app.delete('/users/:noteId', users.delete);
}