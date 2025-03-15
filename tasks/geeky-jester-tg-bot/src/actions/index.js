/***************************************************/
/************** BOT ACTIONS MANAGER ****************/
/***************************************************/
"use strict";

import { diceRollerAction } from "./dice.action.js"; 
import { jokesFetcherAction } from "./joke.action.js"; 
import { algosFetcherActionsHandler } from "./algo.action.js"; 

/**
 * Registers bot actions and menus.
 * Initializes command handlers, menu setup, and additional features.
 *
 * @param {BotService} bot - The bot instance.
 */
export default async function registerActions(bot) {
    console.log("Initializing Register Actions handler...");   
    
    // Register default commands and set action handlers   
    bot.setupCommands(); 
    
    // Register dice-roller commands and actions
    bot.customAction(bot.commands.DICEROLL, diceRollerAction);
    bot.customCommand(bot.commands.DICEROLL, diceRollerAction);
    
    // Register jokes commands and actions
    bot.customAction(bot.commands.JOKE, jokesFetcherAction);
    bot.customCommand(bot.commands.JOKE, jokesFetcherAction);
    
    //Register additional action handlers
    algosFetcherActionsHandler(bot);   
}; // End of registerActions



