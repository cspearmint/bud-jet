// server file to handle requests
const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('./dbFunctions'); // importing database functions

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Endpoint for handling account creation
app.post('/createuser', async (req, res) => {
  const { username, password } = req.body;

  // calls account creation function
  const accountResult = await createUser(username, password);

  /* Respond with the result:
  0 if account created successfully
  1 if username does not meet constraints
  2 if password does not meet constraints
  3 if username is already taken or if other problem occurs
  */
  res.send(loginResult);
});

// Endpoint for handling login requests
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // calls login function
  const loginResult = await getLoginCookie(username, password);

  // Respond with the result (cookie/ID if valid login, null otherwise)
  res.send(loginResult);
});

// Endpoint for handling data requests
app.post('/query', async (req, res) => {
  // cookie is the user ID and field is the requested field (such as monthly income)
  const { cookie, field } = req.body;

  // calls getdata function
  const data = await getData(cookie, field);

  // Respond with the result (whatever data requested if found, null otherwise)
  res.send(data);
});

// Status
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});