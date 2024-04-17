/*
This default user is used by the database when creating new users, then the cookie is set right after.
If you're introducing a field for a module, make sure you edit this so new users will have default
values for every field.
*/

const DEFAULT_USER = { 
    cookie: "",
    data: [1, 2, 4],
    test: [1, 2, 5],
    grocery_cost: 0,
    costs: [{ name: "", date: "", amount: 0.0 }]
};

const LOGIN_STRING = "mongodb+srv://codyflynn:cachecows@budjetaccountdata.eoeu7gt.mongodb.net/?retryWrites=true&w=majority&appName=BudJetAccountData"

module.exports = { DEFAULT_USER, LOGIN_STRING };