/*
This default user is used by the database when creating new users, then the cookie is set right after.
If you're introducing a field for a module, make sure you edit this so new users will have default
values for every field.
*/

const DEFAULT_USER = { 
    cookie: "",
    data: [1, 2, 3],
    test: [1, 2, 3]
};

const LOGIN_STRING = "mongodb+srv://<username>:<password>@budjetaccountdata.eoeu7gt.mongodb.net/?retryWrites=true&w=majority&appName=BudJetAccountData"

module.exports = { DEFAULT_USER, LOGIN_STRING };