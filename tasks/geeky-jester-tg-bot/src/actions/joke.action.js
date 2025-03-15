/***************************************************/
/**************** JOKES FETCHER ********************/
/***************************************************/
"use strict";

import { isValidArray } from "./../helpers/common.helper.js";
import CONSTANTS from "./../core/config/constants.js"; 

/**
 * Fetch jokes from external API resource
 */
export const jokesFetcherAction = async (ctk) => {
    console.log("Initializing jokes fetcher actions...");
    
    try {        
        let response = await fetch(CONSTANTS.JOKES_URL);
        if (!response.ok) throw new Error("Failed to fetch jokes");
        const jokes_data = await response.json();

        let msg = `Oops! Couldn't find a joke, try again later! 😢`;
        
        //Ensure the API response is an array
        if (isValidArray(jokes_data)) throw new Error("Oops! something went wrong!");

        if (jokes_data.type === "single") {
            msg = jokes_data.joke; // Single-line joke
        } else if (jokes_data.type === "twopart") {
            const { setup, delivery } = jokes_data;
            //console.log('setup, delivery',setup, delivery)
            msg = `${setup}\n\n ${delivery}`; // multiline joke
        } 

        ctk.reply(msg);

    } catch (error) {
        console.error("API Error:", error);
        ctk.reply("😢 Sorry, I couldn't fetch a joke right now.");
    }
} // End of jokesFetcherAction

