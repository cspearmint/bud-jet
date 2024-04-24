// server file to handle requests
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createUser, getLoginCookie, getData, setData } = require('./dbFunctions'); // importing database functions

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());

// Endpoint for handling account creation
app.post('/createuser', async (req, res) => {
  const { username, password } = req.body;

  // calls account creation function
  const accountResult = await createUser(username, password);

  /* Respond with the result:
  200 if account created successfully
  400 if username does not meet constraints
  400 if password does not meet constraints
  500 if username is already taken or if other problem occurs
  */
  res.sendStatus(accountResult);
});

// Endpoint for handling login requests
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // calls login function
  const loginResult = await getLoginCookie(username, password);

  //if null, the password or username was incorrect and th
  if (loginResult === null) {
    res.sendStatus(401);
  } else {
    res.status(200).send(loginResult);
  }

});

app.post('/query', async (req, res) => {
    // Extract the cookie from the request body
    const { cookie } = req.body;

    try {
        // Call getData to fetch all data associated with the cookie
        const userData = await getData(cookie);

        if (userData === null) {
            // If no data is found for the given cookie, return a 404 Not Found response
            res.status(404).send('User data not found');
        } else {
            // If data is found, return the user data as JSON response
            res.status(200).json(userData);
        }
    } catch (error) {
        // Handle any errors that occur during data retrieval
        console.error('Error fetching user data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// idk if this works yet but looks good to me :) -Cody
// Endpoint for handling data modification requests
app.post('/setquery', async (req, res) => {
  console.log("Saving begins");
  // cookie is the user ID and field is the requested field (such as monthly income)
  const { cookie, categoriesData } = req.body;
  // calls getdata function
  const data = await setData(cookie, categoriesData);

  // Respond with the result (true if successful, otherwise code 500 sent)
  if (data === false) {
    res.sendStatus(500);
  } 
  else {
    console.log("Saving complete");
    res.status(200).send(data);
  }

});

// idk if this works yet but looks good to me :) -Cody
// Endpoint for handling data modification requests
app.post('/addcost', async (req, res) => {
  // cookie is the user ID and field is the requested field (such as monthly income)
  const { cookie, field, cost } = req.body;
 /// {date: name: amt: }
  // calls getdata function
  const data = await addCostList(cookie, field, cost);

  // Respond with the result (true if successful, otherwise code 500 sent)
  if (data === false) {
    res.sendStatus(500);
  } else {
    res.status(200).send(data);
  }
});


// Status
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
