// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/recipe',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});

// aquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, "Unable to connect to database"));

// up and running then print the message
db.once('open', function(){
    // console.log(`Server is up at port 7000`);
});

// exporting the database
module.exports = db;