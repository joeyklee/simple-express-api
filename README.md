# simple-express-api
simple api with node.js &amp; express.js for ITP Quant Humanists course

## About

There are a zillion ways to make we applications. 

(more desciption)


## A simple CREATE, READ, UPDATE, DELETE - CRUD - express application

We're going to make a simple web application from scratch using node.js and express.js that allows us to really understand how client-server side interactions look like when you boil them down to their most basic form (or the best that I can think of). 

The goal is to:
1. create a server that uses node.js and express to satisfy CREATE, READ, UPDATE, and DELETE on a persistent database - in this case we use NEDB which is a noSQL structure database that is pretty much mongodb but lives in a flat text file (great for prototyping!).
2. interact with this server using postman a API testing tool - it's lovely!
3. interact with this server on the client side with a simple p5.js sketch.



# Setup

NOTE: this assumes you have node.js installed on your machine. 

Lets's start by making a new folder. We use the `mkdir <folder name>` command to make a new folder on your computer. I will be calling my project `simple-express-api` but you can call it whatever you'd like.

```sh
mkdir simple-express-api
```

Now change directories using the `cd </path/to/folder>`

```sh
cd simple-express-api
```

In the next steps we are going to:

1. initialize a node.js project using `npm init`
2. install express.js and nedb 
3. install a few other helpful libraries for building out our application


## Initialize your node.js project

```sh
npm init
```

The command `npm init` creates a file called `package.json` that includes all the details of your project. These details include the project name, description, the dependencies which, as you will see, become included in this project whenever you do `npm install <library name>`. This is what allows others to take your project and run `npm install` to also get all the dependencies for your project. 

You can think of your `package.json` file (and your README) as the place that contains all the necessary information to get your project up and running. 

You can take some time to fill in the details of your project. These details might look like this:

(insert gif here)




## Install your project dependencies


### npm install express

Express is a "thin" layer around node.js. The website calls it a "Fast, unopinionated, minimalist web framework for Node.js". They are not wrong. Express is awesome! 

```sh
npm install express
```

You'll notice that from your terminal you'll see the following message:

```sh
simple-express-api git:(master) ✗ npm install express
npm notice created a lockfile as package-lock.json. You should commit this file.
+ express@4.16.4
added 48 packages from 36 contributors and audited 121 packages in 2.519s
found 0 vulnerabilities)
```

And if you look in your `simple-express-api` folder, that you've now got a folder called `node_modules` and it's full of subfolders. These subfolders contain the dependencies that allow Express.js to be Express! 

### Open your folder in your text editor

If you haven't already, open up your project folder in your text editor so you can see all the things. I'm using VSCode, but here's what it looks like in sublime text.

![]()

### add a .gitignore file

If you're working in git or you plan to send this up to Github at some point, what you don't want to do is to commit your `node_modules`. Because your node_modules are listed dependencies in your package.json file, anyone can see which software they need to install to get their projects up and running. As a result, it doesn't make sense to commit all these hundres of thousands of files and packages living in your node_modules folder to git. 

Let's add a .gitignore file and specify that we want to ignore our node_modules folder.

We can do this a couple ways. Via the terminal we can do it like this -- this says add "node_modules" as text to a file called `.gitignore`

```sh
echo "node_modules" >> .gitignore
```

(add image)

We can also do this using your text editor like so:

(image of add new file)
(image of adding in text)


**we will be adding more dependencies as we move on, but for now, let's keep it as raw as possible. Next step: add your `index.js` file.


## Adding your server code: index.js

Now it's time to add your server code. Let's add an index.js file. Using the `touch <filename>` command, we can add a file to the folder.

```sh
touch index.js
```


Now let's open up your `index.js` file and start by adding the most basic features of an express application.

# Your first express application


## require express
Open up your index.js and require express. `const expresss = require('express')` tells your application to bring in all the functions of express and make them available 

```js
const express = require('express');

```

![image of requiring the express library]()

## initialize your express app

Initialize your express app to a variable called `app`. We do this by adding the following.

```js
const express = require('express');

const app = express();

```


## add your first api endpoint - GET

Now that we have an express app living in our `app` variable, we can create our first API endpoint into our server. The following code tells your server:

> If a GET request (app.get()...) is made to your server at the baseurl, send the message: "hello lovely person".

```js

const express = require('express');

const app = express();

app.get("/", (request, response) => {
    response.send("hello lovely person");
});

```

## tell your server to listen to a specific port

In order for our express application to communicate with the outside world, we need to open up a port for requests and responses to be served up! We do this by adding `app.listen(<port number>, <callback function>)` 

```js

const express = require('express');

const app = express();

app.get("/", (request, response) => {
    response.send("hello lovely person");
});

app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})

```

**Now we have all the pieces of a super duper simple but functional server side API for GET requests**.

Let's test this out.


## Test out our application:
In order to run our application, we can simply run

```sh
node index.js
```

![]()

If all is well, we should see the message we wrote above:

```sh
check out the magic at: http://localhost:3030
```

## Open up in your browser: http://localhost:3030

You'll now see our message there: `hello lovely person`

![]()

## To stop your server: `control + c`

Now that we know our application works, let's stop it and keep developing, To stop any terminal process, you can use: `control + c` to stop the server from running.

![image of stopping the server]() 

## Adding scripts to package.json: `npm start`

In order to run our application, we can simply run `node index.js` BUT we want to be really cool and professional so that we (and other people who want to help develop our application) can just grab our projects, run `npm install`, then `npm start` to run our application. 

To do this we're going to go into our `package.json` and add under `scripts`, the following:

![image of adding "start" to scripts]()

Now if you run in your terminal `npm start`, it will start up your application: 

![image of terminal window at npm start]()


## Adding scripts to package.json: `npm run dev`

Being able to run `npm start` is awesome enough, but the problem is that every time we make a change to our project, we need to stop and start our server again and again. Wouldn't it be nice if our server restarted every time we made a change? (there are instance when this is not preferred, but for now this is good for us).

There is a package called `nodemon` that will take care of this for us. We can add this is a project development dependency by doing:

```sh
npm install nodemon --save-dev
```

The `--save-dev` flag saves this as a dev-dependency which is different from the normal dependencies in that it is only necessary for development of your application, not running it in production.

Now we can add to our scripts "dev", like so:

![image of adding dev to scripts]()

Now if you run `npm run dev`, your server will tell you that it's "watching ..." which just means that it's watching for any changes to any files in your project directory. 


## Aside: adding nodemon globally to help with your project

we can also add this available globally -- meaning, you can run nodemon anywhere on  your machine -- by doing:

```
npm install -g nodemon
```

**If you've made it this far, pat yourself on the back! You're diving into this whole new universe of server side development which can feel very foreign and intimidating, but with practice, you'll be whipping up these little applications like no one's business. Take a break and let's come back to building some of our API endpoints for achieving "CRUD".

***
# CRUD with in-memory data
***

Before we add in a simple database, let's just show what it means to build and API for CRUD endpoints for data that's living on the server.

Let's spec it out. 

## What's CRUD

In order to create data on our server, we can accept data that comes in via POST request. We can send data as JSON, text, and a number of other formats. If we require uses to be authenticated in order to create data in our database, we'd require authentication headers etc, but we won't worrry about this for now. 

Imagine `<route>` to be some route to your server for example, at the root url: "/" or at the url endpoint: "/api"

### CREATE - POST

```js
app.post(<route>, (request, response) =>{
    // all your logic for handling posting data to your database and what to do next
})
```

### READ - GET

```js
app.get(<route>, (request, response) =>{
    // all your logic for getting data from your server and delivering it to your client
})
```

### UPDATE - PUT

```js
app.put(<route>, (request, response) =>{
    // all your logic for updating data on your server and what to do next
})
```

### DELETE - DELETE

```js
app.delete(<route>, (request, response) =>{
    // all your logic for deleting data on your server and what to do next
})
```

Pretty much all APIs have these endpoints for handling the delivery, update, creation, and deletion of data on a server and accessing various functions. 


## For starters: data in memory

In our application, let's spec our how we want our API to operate. Define some JSON in your `index.js` file as a way to prototype with the assumption that our data would come from a database of some sort. REMEMBER: this data is in-memory, so if your server restarts, your data will start from it's initial defined state!

```js
let myData = [
    {id:1, color:"red", x:50, y: 200},
    {id:2, color:"orange", x:100, y: 200},
    {id:3, color:"yellow", x:150, y: 200},
    {id:4, color:"green", x:200, y: 200},
    {id:5, color:"blue", x:250, y: 200},
    {id:6, color:"purple", x:300, y: 200}
];

```

let's add this to our `index.js` file:

```js
const express = require('express');

const app = express();

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

app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})

```

### GET - send data to the client

Express allows us to send data to the client using a number of handy functions. We can send text as we've seen by using `response.send` but we can also specify that we want to send JSON data by sending our data with `response.json()`. Let's try this. 


```js
const express = require('express');

const app = express();

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

app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})

```

NOW, for the magic moment. Go to `http://localhost:3030/api` you will see your data rendered in your web browser!

![image of all the json data sent to your client]()

This is totally awesome. Because it means now, we can send data that lives on our server ANYWHERE. It can be accessed via the url we specified for everyone to enjoy.

## Introducing Postman

Postman is a tool for API development. It is a user interface for testing your API and gives you lots of handy tools for making this process more visual. 

Download Postman so we can use a nice GUI to make a POST request to add some data to our database.

[Postman homepage](https://www.getpostman.com/)
![postman homepage image]()

### Postman interface

You can see in our postman interface that we have something like this:

![image of interface]()

You can also see that in our dropdown menu, we have all the API METHODS we'll ever want.

![image of postman api methods]()

### Testing GET

In our postman, let's test our our GET request we just made to see if Postman is working correctly:

if you set the methods tab to `GET` and the url to : `localhost:3030/api` and press `send` you'll get the following:

![image of url]()
![image of results]()

Hooray! Postamn is sending a GET request to our API and it is behaving as expected. Now we can go carry on an build in the API route to handle a POST request. We can test our if it works using postman in a bit.


## POST - send data to the server 

Let's add in the ability to handle POST requests. In this case, what we're going to do when we POST to our database is push in a JSON object to the `myData` array. Let's see how that looks in context.

VERY IMPORTANT. Express handles how data comes in an out of your server. This means that when requests come in or when responses go out, express needs to have an idea of how to handle these incoming and outgoing data. 

Note how we've added 2 lines of code after our app instantiation. These are "middleware" functions that tell Express - "whenever a post request comes in whether from a form or via API call, handle it as json and make it easy to grab from the request".

```js
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies
```

After adding these middleware, we can add our POST request handler. When a POST request is made, the data sent by that POST will be living in the `request.body` thanks to our 2 lines of code above. We can therefore work with that incoming data as it comes in by targeting that property of our request.

You'll notice that we generate a `randomId` to add to our data just so that we can reference our data later on for when we want to update or delete data.

After the data has been pushed to our array, we send back our updated dataset.

```js
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

app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})

```

NOTE: it's a good idea to do error handling with post requests. You dont want any nefarious things coming into your server and you also want to control the properties and form of your data. 

## Make a POST request using Postman

Now you can make a POST request using Postman. Here I'm sending the JSON as `x-www-form-urlencoded` -- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST: 

```
{color:"red", x:200, y: 200}
```

![image of postman POST request]()

You should get a nice response with your updated data! 

```
[
    ...
    {
        "id": 20,
        "color": "red",
        "x": "200",
        "y": "200"
    }
]
```

## PUT - Update some data

Let's say that we want to update some data in our `myData` array. How might we handle this? Well, we can use a PUT request to handle an update of existing data on our server.

In order to do this, we need some information from our incoming request:

1. the ID of the item we want to update (or at least a position or something to target the values)
2. and the data we want to change. 

Since we're not using a fancy database to handle this logic for us, we'll have to write our own logic, but this is good practice for understanding what is happening under the hood of databases. So let's get to it. Our PUT endpoint will look something like the following:


1. Step 1: We get the ID of the object we want to update from the URL. URLs have this thing called url parameters. In this case, we let our server know that if a request comes in at the endpoint /api/:id where `:id` is a value that matches an id in our data, then we can find it!
2. Step 2: We get the updated data we want to send: e.g `{color:"turqoise"}`
3. Step 3: we use the `.find()` array function to find the data in our myData array with the corresponding ID
4. Step 4: if our data does not exist, return a 404 error and send a message
5. Step 5: check all the properties of the incoming update request and update our data
6. Step 6: Return myData with the newly update data
7. Step 7: send the myData array to the client

```js
// PUT - /api
app.put("/api/:id", (request, response)=> {
    // we get the id of the item we want from request.params.id ==> this matches the :id of the URL parameter
    // Step 1.
    const selectedItemId = request.params.id;
    // Step 2.
    const updatedDataProperties = request.body

    // Step 3: now find the item in our myData
    let selectedItem = myData.find(item => {
        return item.id === Number(selectedItemId)
    });

    // Step 4: if our data is undefined then send a 404 error and send this message
    if(selectedItem == undefined){
        response.status(404).send("oops! we couldn't find that data!");
    }

    // Step 5: for the properties in the incoming json, update our selected object 
    for(p in updatedDataProperties){
        selectedItem[p] = updatedDataProperties[p]
    }

    // Step 6: update myData with the updated data
    myData = myData.map(item => {
        if(item.id == Number(selectedItemId) ){
            return selectedItem
        } else {
            return item
        }
    });

    // Step 7: send back our new myData
    response.json(myData)
});
```

Now we should have this entire code:

```js
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
        return item.id == Number(selectedItemId)
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


app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})
```

## Make a PUT request in postman

Now make a PUT request to postman. Let's change the first instance of our data from `color:"red"` to `color: "turqoise"`

![image of PUT request]()


## DELETE - delete something from our database!

Last but not least, let's make a delete endpoint to our application. Here we do the same as in the PUT request by getting the id from the url parameters, but instead use a simple array filter to filter out the data that matches. 

```js
app.delete('/api/:id', (request, response) => {
    // we get the id of the item we want from request.params.id ==> this matches the :id of the URL parameter
    const selectedItemId = request.params.id;

    // use the .filter() function to return all values not matching that id and overwrite myData
    myData = myData.filter(item => {
        return item.id !== Number(selectedItemId)
    })

    response.json(myData);
})

```

Now our complete CRUD express app looks like this:

```js
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
```


## Delete an object from your data

Now you can delete some data from myData. Use postman to delete a value.

![removing object with id: 1]()


**🌈Hooray!! Now we've got a fully functioning CRUD API in express 🌈 - take a break, go for a walk, jump up and down and sing a song. This is excellent!!**


