const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://admin:recipeAdmin2021@recipe-db.duxzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log('db connected..');
};

module.exports = connectDB;
