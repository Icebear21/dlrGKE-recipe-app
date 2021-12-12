// require express for setting up the express server
const express = require('express');

// set up the port number
const port = 7000;

// importing the DataBase
const db = require('./config/mongoose');

// importng the Schema For tasks
const  Recipe  = require('./models/recipe');

// using express
const app = express();

// using static files
// app.use(express.static("./views"));
// to use encrypted data
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }))

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// rendering the App Page
app.get('/', function(req, res){
    Recipe.find({}, function(err, recipe){
        if(err){
            console.log('Error in fetching recipes from db');
            return;
        }

        return res.render('home', {
            tittle: "Recipe Home",
            recipe: recipe
        });
    }
)});

// creating Tasks
app.post('/create-recipe', function(req, res){
  //  console.log("Creating Task");
    
    Recipe.create({
        description: req.body.description,
        step: req.body.step,
        ingredients: req.body.ingredients

        }, function(err, newrecipe){
        if(err){
            console.log('error in creating recipe', err); 
            res.send('Error in creating recipe')
            return;
        }
        return res.redirect('back');

    });
});
//updating recipes
app.post('/edit-recipe', function (req, res) {
    
   Recipe.updateOne({  
       description: req.body.description,
       step: req.body.step,
       ingredients: req.body.ingredients
   },
       function(err,result){
       if(err){
           res.send(err)
       }
       return res.redirect('back');
   })
})

// deleting Tasks
app.get('/delete-recipe', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of recipe selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Recipe.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting recipe');
            }
        })
    }
    return res.redirect('back'); 
});

// make the app to listen on asigned port number
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});