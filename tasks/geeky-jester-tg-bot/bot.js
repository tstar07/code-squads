/**
 * @module       Bot Generator 
 * @description  Entry point for initializing and launching the Telegram bot.
 * @author       Thasnim
 * @createdOn    2025
 **/
"use strict";

import BotService from "./src/core/services/bot.service.js";
import CONSTANTS from "./src/core/config/constants.js"; 
import registerActions from "./src/actions/index.js";
import { getRandElement } from "./src/helpers/common.helper.js";

/***************************************************/
/***************** BOT GENERATOR *******************/
/***************************************************/

/**
 * Initial Setup
 */

try {
   
    //destructuring required constants
    const { GREETINGS_LIST } = CONSTANTS;

    //Initialize bot with required settings  
    const bot = new BotService(CONSTANTS, getRandElement(GREETINGS_LIST));   

    //Setup bot commands and actions 
    registerActions(bot);   

    //Launch the bot
    bot.launch();
   
} catch (error) {
    console.error("Oops! Bot Error:", error);
}
