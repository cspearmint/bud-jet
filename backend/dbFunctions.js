/*
BudJet Login System Backend v2
Uses MongoDB and NodeJS to facilitate a login server
There are 2 collections in Mongo, "Accounts" which stores usernames and passwords (encrypted using bcrypt) to objects with unique user ids,
And "Data" which essentially acts as a map in which user ids are the key and that user's data is the value.
Full functionality for account creation, logging in, getting the user id upon logging in, and accessing data using that user ID.

V2 has added support for introducing, deleting, and modifying fields across users. Read comments for documentation

-Cody Flynn
*/

const { DEFAULT_USER, LOGIN_STRING } = require('./constants');

// boilerplate to connect to database
const { MongoClient, ServerApiVersion } = require('mongodb');
// insert user and password in place of placeholders
const uri = LOGIN_STRING;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// helps with encryption of stored passwords
const bcrypt = require("bcrypt");

// connection protocol so the database can be accessed within the code
async function connectToMongoDB() {
    await client.connect();
    await client.db("BudJet").command({ ping: 1 });
}

// disconnection protocol so the database isn't always open
async function disconnectFromMongoDB() {
    await client.close();
}

/*
Username/password verification
These functions can be modified to make sure that a given username
or password meets the security constraints that we set
*/
function verifyUsername(username) {
    // username must be at least 4 characters
    return username.length > 3;
}

function verifyPassword(password) {
    // password must be at least 8 characters (wip)
    return password.length > 7;
}

/*
Note: All functions below are asynchronous, so if they are called
within any other code it is best practice to use the "await" keyword
for example:
x = getLoginCookie("user", "pass");

is a bad line of code because x may not be defined by the time it is used elsewhere.
Instead, write:
x = await getLoginCookie("user", "pass");
*/

/*
Create user function
This should be called when a user is trying to make a new account

Assuming they are able to make an account, it stores the user and
a hashed password in the Accounts collection, and then creates
a placeholder data entry in the Data collection with their user ID
being the way to access this info.

Returns:
200 if account created successfully
400 if username does not meet constraints
400 if password does not meet constraints
500 if username is already taken or if other problem occurs
*/
async function createUser(username, password) {
    // connects to database
    await connectToMongoDB();
    // returns error code if username isn't sufficient
    if (!verifyUsername(username)) {
        // disconnects before returning
        await disconnectFromMongoDB();
        return 400;
    }

    // returns error code if password isn't sufficient
    else if (!verifyPassword(password)) {
        // disconnects before returning
        await disconnectFromMongoDB();
        return 400;
    }

    try {
        // encrypts plaintext password using bcrypt library
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // validates uniqueness of the username
        const result = await client.db("BudJet").collection("Accounts").findOne({ username: username });
        
        // if username is unique, inserts new entry to Accounts with user/hashed pass
        // and uses the ID of this entry as a "cookie" which allows access to that user's data
        if (!result) {
            const result = await client.db("BudJet").collection("Accounts").insertOne({ username: username, password: hashedPassword });
            var cookie = result.insertedId.toString();
        } 
        // otherwise the username is already taken, and error is thrown
        else {
            throw new Error("Username is taken");
        }
    } 
    catch (err) {
        console.error("Username is already in use!", err);
        // disconnects before returning
        await disconnectFromMongoDB();
        return 500;
    }
    var user = DEFAULT_USER;
    user.cookie = cookie;
    // if this code is reached, then user is created, so their entry in Data is created
    await client.db("BudJet").collection("Data").insertOne(user);
    // disconnects before returning
    await disconnectFromMongoDB();
    return 200;
}

/*
Login function
This function tries to find an account with the given username and password
It returns a login cookie as a string if there is a match, otherwise it returns null
*/
async function getLoginCookie(username, password) {
    try {
        // connects to database
        await connectToMongoDB();
        // checks if the username is valid
        const result = await client.db("BudJet").collection("Accounts").findOne({ username: username });
        
        // if user is found, compares given password with the stored one
        if (result) {
            // compares password to encrypted password using bcrypt
            const passwords_match = await bcrypt.compare(password, result.password);

            // if the passwords match, fetches the login cookie and returns it
            if (passwords_match) {
                // disconnects before returning
                await disconnectFromMongoDB();
                return result._id.toString();
            }
            // if the passwords don't match, throws error
            else
                throw new Error("Invalid password");
        }
        // if the username doesn't exist, throws error
        else
            throw new Error("User not found");
    } 
    // returns null if login failed
    catch (err) {
        console.error("Error occurred while logging in:", err);
        // disconnects before returning
        await disconnectFromMongoDB();
        return null;
    }
}

/*
Universal getter function for user data
The general use case of this would be
x = await getData("cookie string", "name of field you want");

*/
async function getData(cookie) {
    // tries to find an entry in Data collection under the given cookie
    try {
        // connects to database
        await connectToMongoDB();
        // searches the database
        const result = await client.db("BudJet").collection("Data").findOne({ cookie: cookie });
        // if found, try to access the data from the given field
        if (result) {
            await disconnectFromMongoDB();
            return result;
        }
        // otherwise, the cookie is invalid and it throws an error 
        else
            throw new Error("Failed to find user");
    } 
    catch (err) {
        console.error("Error occurred while fetching data", err);
        // disconnects before returning
        await disconnectFromMongoDB();
        return null;
    }
}

// setter function (change data fields, opposite of above function)
// you also have to use "await"
async function setData(cookie, field, new_value) {
    // tries to find an entry in Data collection under the given cookie
    try {
        if (field == "cookie")
            throw new Error("you can't overwrite user cookies (that would destroy the database)");
        // connects to database
        await connectToMongoDB();
        // searches the database
        const result = await client.db("BudJet").collection("Data").findOne({ cookie: cookie });
        // if found, try to access the data from the given field
        if (result) {
            // checks if field is valid and returns the value of that field if so
            if (result[field]) {  
                // disconnects before returning
                const data_type = typeof result[field];
                if (typeof new_value != data_type)
                    throw new Error("Data types do not match!");

                const update = { $set: { [field]: new_value } };
                await client.db("BudJet").collection("Data").updateOne({ cookie: cookie }, update);
                await disconnectFromMongoDB();
                return true;
            }

            // otherwise, the user exists and the field doesn't, so it returns null    
            throw new Error("Invalid field");
        } 
        // otherwise, the cookie is invalid and it throws an error 
        else
            throw new Error("Failed to find user");
    } 
    catch (err) {
        console.error("Error occurred while setting data", err);
        // disconnects before returning
        await disconnectFromMongoDB();
        return false;
    }
}


// field create/delete (for dev use only)
// if someone is making a new module and wants all users to have a new field and a default value for that field
// you can call this function by running the server directly with a call to this function in the sandbox area

/*
NOTE: if you use this function to create a field that already exists, it will just overwrite the value for
ALL USERS, so be careful when doing this. This may be useful if your idea for implementation changes
*/ 

async function createField(new_field, default_value) {
    try {
        // checks if youre trying to overwrite the cookie system
        if (new_field == "cookie")
            throw new Error("you can't overwrite all user cookies (that would destroy the database)");

        // connects to database
        await connectToMongoDB();

        // creates new field/default value update
        const update = { $set: { [new_field]: default_value } };

        // applies it to the database
        await client.db("BudJet").collection("Data").updateMany({  }, update);

        // disconnects and returns
        await disconnectFromMongoDB();
        return;

    } 
    catch (err) {
        console.error("Error occurred while setting data", err);
        // disconnects before returning
        await disconnectFromMongoDB();
        return;
    }
}

// also a function to delete fields, same risks apply as above
async function deleteField(field) {
    try {
        // checks if youre trying to delete the cookie system
        if (field == "cookie")
            throw new Error("you can't delete all user cookies (that would destroy the database)");

        // connects to database
        await connectToMongoDB();

        // unsets the field in an update
        const update = { $unset: { [field]: "" } };

        // applies it to the database
        await client.db("BudJet").collection("Data").updateMany({  }, update);

        // disconnects and returns
        await disconnectFromMongoDB();
        return;

    } 
    catch (err) {
        console.error("Error occurred while setting data", err);
        // disconnects before returning
        await disconnectFromMongoDB();
        return;
    }
}

/*
user information is stored in cost arrays that are saved per user on database.
The following costs exist:
groceries/food
student costs
rent and utilities
other

which are 4 vectors of floats saved per user.

this allows you to pick a category and add a cost to it.

*/

/* 
id is a string identifier, if none provided then default
amount is a float storing the cost of the transaction
date is date stored however you want to format it.. 



*/

async function addCostList(cookie, field, new_cost) {
    // get cost list with query
    var cost_list = getData(cookie, field);

    // append cost list with provided cost
    cost_list.push(new_cost);

    // set user's cost list to appended list
    setData(cookie, field, cost_list);

    return;
}

/*
async function removeCostList(cookie, list, cost_id) {
        // get cost list with query
        var cost_list = getData(cookie, list);
        // check if cost with existing id exists, and remove it from list

    
        // set user's cost list to updated list
        setData(cookie, list, cost_list);

}
*/

module.exports = { createUser, getLoginCookie, getData, setData, createField, deleteField, addCostList };