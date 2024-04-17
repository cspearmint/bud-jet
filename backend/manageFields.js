const { deleteField, createField, setData } = require('./dbFunctions'); // importing database functions
const prompt = require('prompt-sync')({ sigint: true });

// This script lets you add/delete fields from every entry in database

// Change this value to whatever you want the default to be. I didn't make an option for this
// within the program because making vectors or other more specific data types from a string
// is unnecessarily complicated for the use case of this.
const DEFAULT_VALUE = [];

const HELP_MESSAGE = "create <field name> <DEFAULT_VALUE (change within code)>\ndelete <field name>\n";

// script to add/remove fields
async function main() {
    prompt("Welcome to field editor, press enter to begin.");
    // inf loop
    while (true) {
        // prompts for one of 3 commands and splits the input
        var user_input = prompt("Enter a command or type \"help\": ");
        var command_parse = user_input.split(' ');
        if (command_parse[0] == "delete") {
            // verifies deletion before doing anything
            var user_input = prompt(`This will delete field ${command_parse[1]}. Type \"y\" to continue: `);
            if (user_input[0] = "y") {
                await deleteField(command_parse[1]);
                prompt("Field deleted. Make sure to update constants.js as well!");
            }
        }
        else if (command_parse[0] == "create") {
            // verifies creation before doing anything
            var user_input = prompt(`This will create field ${command_parse[1]}, with default value ${DEFAULT_VALUE}. Type \"y\" to continue: `)
            if (user_input[0] = "y") {
                await createField(command_parse[1], DEFAULT_VALUE);
                prompt("Field created. Make sure to update constants.js as well!");
            }
        }
        else if (command_parse[0] == "help")
            prompt(HELP_MESSAGE);
        else   
            prompt("Invalid command.")
    }
}

main()