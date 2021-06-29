//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine" , "ejs");

//Connecting to mongoose Database server..DB name = toDoListDB
mongoose.connect("mongodb://localhost:27017/toDoListDB" , {useNewUrlParser : true, useUnifiedTopology: true},
(err) => {
if(err) console.log(err);
else console.log("Successfully connected to database");

});

//Creating Schema
const listSchema = {
  name : {
     type : String,
     required : [true , "Kaa pehelwaan..Naam dalna bhool gye ka?"]
  }
}

//Creating Model
const Item = mongoose.model("Item" , listSchema);

//Adding default items for testing
// const item1 = new Item({
// name : "Item1"
//   });
//
// const item2 = new Item({ name: "Item2"});
// const item3 = new Item({ name: "Item3"});
//
// Item.insertMany([item1,item2,item3] , (err) => {
//
//   if(err) console.log(err);
//   else console.log("Document Successfully added!");
// });



app.get("/", function(req, res){

  var day = date.getDate();

  Item.find({}, (err, result) => {
       res.render("list" , {day : day , Item : result});

  });
});



app.post("/compose" , (req,res) =>
{
  let item = new Item({
  name : req.body.item
  });


app.post("/delete" , (req,res) => {
   console.log(req.body.checkbox);
});



  Item.create([item] , (err) => {

    if(err) console.log(err);
    else console.log("Added document to database!! --> " , req.body.item);

  });

  res.redirect("/");
});






app.listen(3000, function(){
  console.log("Server started on port 3000.....");
});
