const express = require('express');         //Express Framework: This line imports the Express module, which is essential for creating the server and handling routing, middleware, and other web-related functionalities.
                                            //Express simplifies the process of setting up a server and managing HTTP requests and responses.

const app = express();                      //instace of express, it’s used to define routes, configure middleware, set up view engines, and more.

const path = require('path');               //Path Module: The path module is a built-in Node.js module that provides utilities for working with file and directory paths.
                                            //It's commonly used to resolve directory paths, especially when serving static files or setting up view engines.
                              
const session = require("express-session"); //Session Middleware: express-session is a middleware for managing user sessions in an Express application.
                                            //It allows you to store data on the server on a per-client basis, which is essential for features like 
                                                    //user authentication, shopping carts, and maintaining state across multiple requests.


const router = require('./routes/home.routes'); // meanings: . -> current folder (WEB_DEV), /routes -> go to routes, /home.routes -> file
app.use(express.json()); // Middleware for parsing application/json

app.use(session({
    secret: 'secret',

// Purpose: The secret is a string used to sign the session ID cookie using hash (hashcodes in OOP). This signature ensures that the cookie data is tamper-proof.

// Importance:

// Security: A strong, unpredictable secret is crucial for protecting session data. If an attacker discovers the secret, they could potentially forge session cookies.
//-----------------------------------------------------------------------------
    resave: false,          

// Purpose: Determines whether the session should be saved back to the session store even if it wasn't modified during the request.

// Options:
    // true: Forces the session to be saved on every request, regardless of changes.
    // false: Prevents the session from being saved if it hasn't been modified.
    // Recommended Setting: false

// Rationale:
    // Performance: Setting resave to false reduces unnecessary writes to the session store, which can improve performance, especially with scalable applications.
    // Avoid Race Conditions: It helps prevent potential race conditions where multiple requests might try to save the session simultaneously.
//--------------------------------------------------------------------------------

    saveUninitialized: true,

//When a client makes an HTTP request, and that request doesn't contain a session cookie, a new session will be created by express-session. Creating a new session does a few things:
    // generate a unique session id
    // store that session id in a session cookie (so subsequent requests made by the client can be identified)
    // create an empty session object, as req.session
    // depending on the value of saveUninitialized, at the end of the request, the session object will be stored in the session store (which is generally some sort of database)
    // If during the lifetime of the request the session object isn't modified then, at the end of the request and when saveUninitialized is false, the (still empty, because unmodified) session object will not be stored in the session store.
//---------------------------------------------------------------------------------
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // this is timer for session in miliseconds, 24 hours
}));
//------------------------------------------

app.use((req, res, next) => {
    if (!req.session.data) { //if is for first time at website so we initialize a session, put 5000 ms to see it for yourself
        req.session.data = {
            clickedButtons: 0,     
            expiresAt: new Date(Date.now() + req.session.cookie.maxAge),  // Expiration time
            arrayOfInputData: []
        };
    } else { 
        // Update expiresAt to ensure it always reflects the remaining session time
        req.session.data.expiresAt = new Date(Date.now() + req.session.cookie.maxAge);
    }
    //this if is an example from summer exam where you had to create a little databdase for session  to store some data (logically) for each user at his session
    next();
})
//----------------------------------
app.set('views', path.join(__dirname, 'views'));
// Purpose: The string 'views' is the name of the setting you're configuring. In Express.js, 'views' is a predefined setting that specifies the directory where your application's view templates are stored.
// Role in Express: When you render a view (using res.render), Express looks for the corresponding template file in the directory specified by the 'views' setting.
//-------------------------------------------

app.set('view engine', 'ejs'); 
//configuring setting 'view engine' 
// Purpose: Specifies the templating engine to use (e.g., EJS, Pug, Handlebars).
// Usage: Enables you to omit the file extension when rendering views. For example, res.render('index') will look for index.ejs if 'view engine' is set to 'ejs'. 
//---------------------------------

app.use(express.static(path.join(__dirname, 'public')));
//in what folder to look for logic and looks of website: css,javascript, images
//----------------------------------

app.use(express.urlencoded({
    extended: true
}));
//Middleware for parsing incoming requests with URL-encoded payloads. It’s a built-in middleware in Express.
//----------------------

app.use('/', router); // middleware funtion to use router variable in 14th line that leads us to a folder used only for GET, POST, DELETE, etc. methods
//-------------------------------------


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})
//where our application is listening for requests
//run this here or in terminal/powershell/cmd with node server.js
//-----------------------------------------  
//Source of information: Stackoverflow 