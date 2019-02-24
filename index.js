const express = require('express');

const path = require('path');
// Type 3: Persistent datastore with automatic loading
const Datastore = require('nedb');
const pathToData = path.resolve(__dirname, "db/db")
const db = new Datastore({ filename: pathToData});
db.loadDatabase();

const app = express();

// Send files from the public directory
app.use(express.static( path.resolve(__dirname, 'public') ));

// Handling JSON data 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies


app.get("/", (request, response) => {
    response.sendFile("index.html");
});

// our API
// GET - /api
app.get("/api", (request, response) => {    
    db.find({}, function (err, docs) {
        if(err){
            return err;
        } 
        response.json(docs);
    });
});

// POST - /api
app.post("/api", (request, response) => {
    // our unix timestamp
    const unixTimeCreated = new Date().getTime();
    // add our unix time as a "created" property and add it to our request.body
    const newData = Object.assign({"created": unixTimeCreated}, request.body)

    // add in our data object to our database using .insert()
    db.insert(newData, (err, docs) =>{
        if(err){
            return err;
        }
        response.json(docs);
    });
})


// PUT - /api
app.put("/api/:id", (request, response)=> {
    // we get the id of the item we want from request.params.id ==> this matches the :id of the URL parameter
    const selectedItemId = request.params.id;
    const updatedDataProperties = request.body

    
   // Set an existing field's value
   db.update({ _id: selectedItemId  }, { $set: updatedDataProperties }, (err, numReplaced) => {
       if(err){
           response.status(404).send("uh oh! something went wrong on update");
       }
        // redirect to "GET" all the latest data
        response.redirect("/api")
   });

});

// DELETE - /api
app.delete('/api/:id', (request, response) => {
    // we get the id of the item we want from request.params.id ==> this matches the :id of the URL parameter
    const selectedItemId = request.params.id;

    db.remove({ _id: selectedItemId }, {}, function (err, numRemoved) {
        if(err){
           response.status(404).send("uh oh! something went wrong on delete");
          }
         // numRemoved = 1
         response.redirect("/api")
      });

})


app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})