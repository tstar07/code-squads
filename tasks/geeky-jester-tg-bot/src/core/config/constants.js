/***************************************************/
/*************** GLOBAL CONSTANTS ******************/
/***************************************************/
"use strict";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const commands = {
    START: "start",
    HELP: "help",
    DICEROLL: "dice",
    JOKE: "joke",       
    ALGOS: "algos",
    MENU: "menu" 
};

const algo_commands = {
    SEARCHING: "searching",
    SORTING:  "sorting",
    GRAPH:  "graph",
    RECURSION:  "recursion",
    MENU: "menu"
}

const config_obj = {

    BOT_TOKEN: process.env.BOT_TOKEN,
    COMMANDS: commands,
    ALGO_COMMANDS : algo_commands,
    JOKES_URL: process.env.JOKES_API_URL,
    
    COMMANDS_LIST: [
        { command: commands.START, description: "Start the bot" },  
        { command: commands.DICEROLL, description: "Roll a Dice" },      
        { command: commands.JOKE, description: "Get a random joke" },        
        { command: commands.ALGOS, description: "Get code for an algorithm" },
        { command: commands.HELP, description: "Show help menu" },
        { command: commands.MENU, description: "Show command menu" },
    ],

    GREETINGS_LIST: [
        "Hello! 😊 Welcome to the Geeky Jester Bot!",
        "Hey there! 🎩 Ready for some fun and learning?",
        "Hi! 🚀 Let's roll the dice and crack some algorithms!",
        "Greetings, friend! 🤖 Ready for some geeky fun?",
        "Hola! 🎭 Let's play, laugh, and learn together!",
        "Welcome! 🃏 Hope you're having a great day!"
    ],

    MENU_LIST: [
        { btn_text: "🎲 Dice Roll", call_back: commands.DICEROLL },
        { btn_text: "😂 Joke", call_back: commands.JOKE },
        { btn_text: "📚 Algorithms", call_back: commands.ALGOS },
        { btn_text: "Help", call_back: commands.HELP }
    ],   

    ALGO_MENU_LIST: [       
        { btn_text: "🔍 Searching", call_back: algo_commands.SEARCHING },        
        { btn_text: "🔢 Sorting", call_back: algo_commands.SORTING },
        { btn_text: "🔄 Recursion", call_back: algo_commands.RECURSION },
        { btn_text: "🌐 Graph Algorithms", call_back: algo_commands.GRAPH },
        { btn_text: "⬅️ Back to Menu", call_back: commands.MENU }
    ]

};

/***************************************************/
/*************** OBJECT FREEZE *********************/
/***************************************************/

/**
 * shallow freeze as deep nested no need
 * if deep freeze need use custom method from common js
 */ 
const CONSTANTS = Object.freeze(config_obj);

export default CONSTANTS;
