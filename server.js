const express = require('express');
const path=require('path')
var fs = require('fs');
const bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
// create express app
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);
require('./app/routes/teacher.routes.js')(app);
require('./app/routes/schoolclass.routes.js')(app);
require('./app/routes/student.routes.js')(app);
require('./app/routes/work.routes.js')(app);
require('./app/routes/comment.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/game.routes.js')(app);
require('./app/routes/createnumber.routes.js')(app);

// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});