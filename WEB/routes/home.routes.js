const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const initialMessage = "This is a response from the initial GET on load.";
    
    // Define the array, ensuring it defaults to an empty array if it doesn't exist
    const array = req.session.data.arrayOfInputData || [];

    return res.render('index', { 
        expiresAt: req.session.data.expiresAt, 
        btnCounter: req.session.data.clickedButtons,
        initialMessage,
        array // Pass the array to the view
    });
});


router.get('/methodGET', (req, res) => {
    // Prepare the data you want to send back
    req.session.data.clickedButtons++; //this is button, increase clicked counter for session
    const data = { 
        message: "This response is for GET request from fetch function in index.js file. GET method is used to get us or bring us something from server."+ 
                 "<br>CODE -> router.get('/methodGET', (req, res) => {... in home.routes.js file.",
        clicks: req.session.data.clickedButtons
    };
    res.json(data); // Send data as JSON, here we stick on res a data which we must say it is JSON
});


router.get('/postButtonInfo', (req, res) => {
    req.session.data.clickedButtons++; // Increment the clicked buttons counter
    const data = {
        message: "This response is for GET request from fetch function in index.js file. POST method is used to add something to the server, such as when we add text."+ 
                 "<br>CODE -> router.get('/postButtonInfo', (req, res) => {... in home.routes.js file.",
        clicks: req.session.data.clickedButtons,
    };
    res.json(data); // Send back the JSON response
});


router.post('/methodPOST', (req, res) => {
    if (req.body.input) {
        req.session.data.arrayOfInputData.push(req.body.input); // Store the input data
    } else {
        console.log('Input was undefined or null'); // Debugging line
    }         
     // Get the input data from the request body, this is in index.js -> body: JSON.stringify({ input: inputData }) // Send the form data as JSON
    const data = { 
        array: req.session.data.arrayOfInputData
    };
    res.json(data); // Send back the JSON response
});

router.get('/putButtonInfo', (req, res) => {
    req.session.data.clickedButtons++; // Increment the clicked buttons counter
    const data = {
        message: "This response is for GET request from fetch function in index.js file. PUT method is used to update something to the server, such as when we replace text."+ 
                 "<br>CODE -> router.get('/putButtonInfo', (req, res) => {... in home.routes.js file.",
        clicks: req.session.data.clickedButtons,
    };
    res.json(data); // Send back the JSON response
})

router.put('/replaceString', (req, res) => {
    const { oldData, newData } = req.body; // Extract oldData and newData from the request body

    // Check if the session data exists
    if (req.session.data && req.session.data.arrayOfInputData) {
        // Find the index of the old data in the array
        const index = req.session.data.arrayOfInputData.indexOf(oldData);

        if (index !== -1) {
            // Replace the old data with new data
            req.session.data.arrayOfInputData[index] = newData;
            // Return the updated array
            return res.json({
                arrayOfInputData: req.session.data.arrayOfInputData
            });
        } else {
            // Return a 404 error if oldData is not found
            return res.status(404).json({ error: 'Old data not found in the array.' });
        }
    } else {
        // Return a 500 error if session data is not initialized
        return res.status(500).json({ error: 'Session data is not initialized.' });
    }
});



router.get('/deleteButtonInfo',(req, res) =>{
    req.session.data.clickedButtons++; // Increment the clicked buttons counter
    const data = {
        message: "This response is for GET request from fetch function in index.js file. DELETE method is used to delete something to the server, such as when we remove text."+ 
                 "<br>CODE -> router.get('/deleteButtonInfo', (req, res) => {... in home.routes.js file.",
        clicks: req.session.data.clickedButtons,
    };
    res.json(data); // Send back the JSON response
})

router.delete('/methodDELETE', (req, res) => {
    const itemToDelete = req.body.item; // Get the item to delete from the request body

    // Check if session data exists
    if (req.session.data) {
        const index = req.session.data.arrayOfInputData.indexOf(itemToDelete);
        
        if (index !== -1) {
            // Remove the item from the array
            req.session.data.arrayOfInputData.splice(index, 1);
            // Return the updated array
            return res.json({
                array: req.session.data.arrayOfInputData
            });
        } else {
            // Return a 404 error if item not found
            return res.status(404).json({ error: 'Item not found in the array.' });
        }
    } else {
        // Return a 500 error if session data is not initialized
        return res.status(500).json({ error: 'Session data is not initialized.' });
    }
});

module.exports = router; //Has to be last line!
                         //Purpose: To export the router object from the module so it can be used in other parts of your application.
                         // Usage: When you require this module in another file (like server.js), it allows you to attach the routes defined in this file to your main Express application.