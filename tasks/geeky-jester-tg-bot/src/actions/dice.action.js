/***************************************************/
/****************** DICE ROLLER ********************/
/***************************************************/
"use strict";

import { isEven, getRandNumber } from "./../helpers/common.helper.js";

/**
 * Dice roller - rolls a dice and announces the result
 */
export const diceRollerAction = async (ctx) => {
    console.log("Initializing dice roller actions...");

    const dice_result = getRandNumber(1, 6); // random 1-6  
    const status = isEven(dice_result) ? "Hooray! Winner! 🎉" : "Loser! 😢 Try again";

    await ctx.reply(`🎲 You rolled a ${dice_result}! ${status}`);
}; // End of diceRollerAction
