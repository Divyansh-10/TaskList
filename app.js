//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Connecting to mongoose Database server..DB name = toDoListDB
mongoose.connect("mongodb://localhost:27017/toDoListDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Successfully connected to database");

  });

//Creating Schema
const listSchema = {
  name: {
    type: String,
    required: [true, "Kaa pehelwaan..Naam dalna bhool gye ka?"]
  }
}

//Creating Model
const Item = mongoose.model("Item", listSchema);
const Work = mongoose.model("Work", listSchema);

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



//Routes for Item List
//Root route
app.get("/:list", function(req, res) {

  let list = req.params.list;

  if(list === "home")
  {

  Item.find({}, (err, result) => {
    res.render("list", {Item: result });
  });
}

  if(list === "work")
  {
    Work.find({}, (err, result) => {
        res.render("workList", { Work: result});
    });
  }

});


//Compose route
app.post("/compose/:compose", (req, res) => {

   let compose = req.params.compose;

   if(compose === "home")
 {

  let item = new Item({
    name: req.body.item
  });

  Item.create([item], (err) => {

    if (err) console.log(err);
    else console.log("Added document to Item database!!");

  });

  res.redirect("/home");
}

   if(compose === "work")
   {
     let work = new Work({
       name: req.body.item
     });

     Work.create([work] , (err) => {
       if(err) console.log(err);
       else console.log("Insertion to work list successfull!");
     });

     res.redirect("/work");
   }


});



//Delete route
app.post("/delete/:del", (req, res) => {

  const del = req.params.del;

  if(del === "home")
  {
  let del = req.body.checkbox;

  Item.deleteOne({  _id: del }, (err) => {

    if (err) console.log(err);
    else console.log(del + " Item deleted successfully");
  });

  res.redirect("/home");
}



if(del === "work")
{
  let id = req.body.checkbox;

  Work.findByIdAndRemove( id , (err) => {

    if(err) console.log(err);
    else console.log("Successfully Deleted from work List");
  });

   res.redirect("/work");
}


});



//Routes for work list
// app.get("/work", (req, res) => {
//
//       Work.find({}, (err, result) => {
//           res.render("workList", { Work: result});
//       });
//     });


// app.post("/composeWork", (req, res) => {
//
//       let work = new Work({
//         name: req.body.item
//       });
//
//       Work.create([work] , (err) => {
//         if(err) console.log(err);
//         else console.log("Insertion to work list successfull!");
//       });
//
//       res.redirect("/work");
//     });


// app.post("/deleteWork" , (req,res) => {
//
//    let id = req.body.checkbox;
//
//    Work.findByIdAndRemove( id , (err) => {
//
//      if(err) console.log(err);
//      else console.log("Successfully Deleted from work List");
//    });
//
//     res.redirect("/work");
//
// });



app.listen(process.env.PORT || 3000, () => {
      console.log("Server started...", process.env.PORT );
    });
