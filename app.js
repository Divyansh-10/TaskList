//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine" , "ejs");



var items = [];

app.get("/", function(req, res){

  var day = date.getDate();

  res.render("list" , {day : day , listItems : items});
});

app.post("/" , (req,res) =>
{
  var td = req.body.td1;
  items.push(td);

  res.redirect("/");
});




app.listen(3000, function(){
  console.log("Server started on port 3000.....");
});
