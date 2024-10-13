//BUTTONS LOGIC START
//---------------------------GET BUTTON--------------------------------------------------------------
document.getElementById('getButton').addEventListener('click', function(){
    fetch('/methodGET').then(response => { // synonyms for fetch: 'go get', ' bring in'
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Convert the response to JSON
    })
    .then(data => {
        // Handle the data received from the server
        document.getElementById('clickCounter').innerHTML = 'Click counter: ' + data.clicks;
        document.getElementById('initialOutput').innerHTML = data.message;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('initialOutput').innerHTML = 'Error: ' + error.message;
    });
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('replaceForm').style.display = 'none';
    document.getElementById('deleteForm').style.display = 'none'; // Hide the form
})  
//--------------------------POST BUTTON INFO---------------------------------------------------------------
// Show the form when POST button is clicked
document.getElementById('postButton').addEventListener('click', function() {
    fetch('/postButtonInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            // Display the message received from the server
            document.getElementById('clickCounter').innerHTML = 'Click counter: ' + data.clicks;
            document.getElementById('initialOutput').innerHTML = data.message; // Assuming the response has a message field
            document.getElementById('myForm').style.display = 'block'; // Show the form after fetching the message
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('initialOutput').innerHTML = 'Error: ' + error.message;
        });
    document.getElementById('replaceForm').style.display = 'none';
    document.getElementById('deleteForm').style.display = 'none'; // Hide the form
});
//----------------SUBMIT BUTTON-------------------------------------------
// Handle form submission with POST request
document.getElementById('postSubmit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const inputData = document.getElementById('inputData').value; //we take input from user
                                               //----------------------------------------------------------------------------
    fetch('/methodPOST', {                     //Why Do You Need Headers in POST but Not in GET?GET: No body is being sent, 
        method: 'POST',                        //so there's no ambiguity about the format of the request. The URL itself is enough, 
        headers: {                             //and the browser can handle basic headers automatically.POST: You're sending a body with the request, 
                                               //and the server needs to know how to parse that body. The Content-Type header tells the server what format to expect (e.g., JSON, XML, form data). 
                                               //Without it, the server won't know how to correctly interpret the body.
                                               //----------------------------------------------------------------------------
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify({ input: inputData }) // Send the form data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Convert the response to JSON
    })
    .then(data => {
        const inputList = data.array.map(item => `<li>${item}</li>`).join(''); //we are using mapper function that takes an element and change it into what we want, like map in Java language also,
                                                                                // inputList is a JavaScript-generated string that is iterable
        document.getElementById('allInputs').innerHTML = `                  
            <h3>Input Data from Session:</h3>
            <ul>${inputList}</ul>`;     //notice that we are litterally copying the text from index.js and sending iterable inputlist that has inside <li><%= input %></li> from index.ejs
        document.getElementById('inputData').value = ''; // Clear input field
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('initialOutput').innerHTML = 'Error: ' + error.message;
    });
    document.getElementById('myForm').style.display = 'none';

}); 
//-----------------------PUT BUTTON -----------------------------------
document.getElementById('putButton').addEventListener('click', function() {
    fetch('/putButtonInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            // Display the message received from the server
            document.getElementById('clickCounter').innerHTML = 'Click counter: ' + data.clicks;
            document.getElementById('initialOutput').innerHTML = data.message; // Assuming the response has a message field
            document.getElementById('replaceForm').style.display = 'block'; // Show the form after fetching the message
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('initialOutput').innerHTML = 'Error: ' + error.message;
        });
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('deleteForm').style.display = 'none'; // Hide the form
});

//---------------------submit for form replace---------------
document.getElementById('putSubmit').addEventListener('click', function(event){
    event.preventDefault(); // Prevent default form submission

    // Get the values from the input fields
    const oldData = document.getElementById('oldData').value;
    const newData = document.getElementById('newData').value;

    // Send a PUT request to the server
    fetch('/replaceString', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',  // Specify that we're sending JSON data
        },
        body: JSON.stringify({ oldData, newData }),  // Send the old and new data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();  // Convert the response to JSON
    })
    .then(data => {
        // Update the DOM with the new array after replacement
        const inputList = data.arrayOfInputData.map(item => `<li>${item}</li>`).join('');  // Map over the updated array
        document.getElementById('allInputs').innerHTML = `
            <h3>Input Data from Session:</h3>
            <ul>${inputList}</ul>`;  // Update the list in the DOM

         document.getElementById('oldData').value = ''; // Clear input field
         document.getElementById('newData').value = ''; // Clear input field
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('initialOutput').innerHTML = 'Error: ' + error.message;  // Show error in the UI
    });

    document.getElementById('replaceForm').style.display = 'none';
    document.getElementById('deleteForm').style.display = 'none'; // Hide the form
});

//--------------------------------DELETE BUTTON--------------------------
document.getElementById('deleteButton').addEventListener('click', function() {
    fetch('/deleteButtonInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            // Display the message received from the server
            document.getElementById('clickCounter').innerHTML = 'Click counter: ' + data.clicks;
            document.getElementById('initialOutput').innerHTML = data.message; // Assuming the response has a message field
            document.getElementById('deleteForm').style.display = 'block'; // Show the form after fetching the message
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('initialOutput').innerHTML = 'Error: ' + error.message;
        });
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('replaceForm').style.display = 'none';
});

//-----------------------deleteSubmit-----
// Handle form submission with DELETE request
document.getElementById('deleteSubmit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const inputData = document.getElementById('deleteData').value; // Get the item to delete

    fetch('/methodDELETE', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        },
        body: JSON.stringify({ item: inputData }) // Send the item to delete in the request body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Convert the response to JSON
    })
    .then(data => {
        const inputList = data.array.map(item => `<li>${item}</li>`).join(''); // Generate the updated list
        document.getElementById('allInputs').innerHTML = `                  
            <h3>Input Data from Session:</h3>
            <ul>${inputList}</ul>`;
        document.getElementById('inputData').value = ''; // Clear input field
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('initialOutput').innerHTML = 'Error: ' + error.message;
    });
    document.getElementById('myForm').style.display = 'none'; // Hide the form
    document.getElementById('replaceForm').style.display = 'none'; // Hide the form
});

//BUTTONS LOGIC END