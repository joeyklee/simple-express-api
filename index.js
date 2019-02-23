const express = require('express');

const app = express();

// Handling JSON data 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies

let myData = [
    {id:1, color:"red", x:50, y: 200},
    {id:2, color:"orange", x:100, y: 200},
    {id:3, color:"yellow", x:150, y: 200},
    {id:4, color:"green", x:200, y: 200},
    {id:5, color:"blue", x:250, y: 200},
    {id:6, color:"purple", x:300, y: 200}
];

app.get("/", (request, response) => {
    response.send("hello lovely person");
});

// our API
// GET - /api
app.get("/api", (request, response) => {
    response.json(myData);
});

// POST - /api
app.post("/api", (request, response) => {
    // create a random ID to reference your data later on
    let randomId = Math.floor(Math.random()*1000);
    // Take our data from request.body and add the randomId to it as an id property
    const newData = Object.assign({id: randomId}, request.body);
    // push this newData object into myData
    myData.push(newData);
    // return the updated data - here we can do a number of things, redirect to a new page, etc. For now, let's send the updated data.
    response.json(myData)
});


// PUT - /api
app.put("/api/:id", (request, response)=> {
    // we get the id of the item we want from request.params.id ==> this matches the :id of the URL parameter
    const selectedItemId = request.params.id;
    const updatedDataProperties = request.body

    // now find the item in our myData
    let selectedItem = myData.find(item => {
        return item.id === Number(selectedItemId)
    });

    // if our data is undefined then send a 404 error and send this message
    if(selectedItem == undefined){
        response.status(404).send("oops! we couldn't find that data!");
    }

    // for the properties in the incoming json, update our selected object 
    for(p in updatedDataProperties){
        selectedItem[p] = updatedDataProperties[p]
    }

    // update myData with the updated data
    myData.map(item => {
        if(item.id === Number(selectedItemId)){
            return selectedItem
        } else {
            return item
        }
    });

    response.json(myData)
});


app.delete('/api/:id', (request, response) => {
    // we get the id of the item we want from request.params.id ==> this matches the :id of the URL parameter
    const selectedItemId = request.params.id;

    // use the .filter() function to return all values not matching that id and overwrite myData
    const newData = myData.filter(item => {
        return item.id !== Number(selectedItemId)
    })

    // console.log(myData.length)
    myData = newData;

    response.json(myData);
})


app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})