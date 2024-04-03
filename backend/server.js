// server file to handle requests
const express = require('express');
const bodyParser = require('body-parser');
const { createUser, getLoginCookie, getData } = require('./dbFunctions'); // importing database functions

const app = express();
const PORT = 3001;

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

// Endpoint for handling data requests
app.post('/query', async (req, res) => {
  // cookie is the user ID and field is the requested field (such as monthly income)
  const { cookie, field } = req.body;

  // calls getdata function
  const data = await getData(cookie, field);

  // Respond with the result (if requested data is found, otherwise code 500 sent)
  if (data === null) {
    res.sendStatus(500);
  } else {
    res.status(200).send(data);
  }

});

// Status
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});