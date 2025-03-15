/***************************************************/
/****************** ALGOS FETCHER ******************/
/***************************************************/
"use strict";

import { algorithms } from "./../data/algos.js";
import sanitizeHtml from "sanitize-html";

/**
 * Handler for algorithm fetcher actions
 */
export const algosFetcherActionsHandler = async (bot) => {
    console.log("Initializing Algorithm Fetcher Actions...");

    // S1: Display Main Algorithm Categories
    bot.customAction(
        bot.commands.ALGOS,
        async (ctx) => {
            //bot.setMenu(CONSTANTS.ALGO_MENU_LIST);
            await bot.sendReplyMessage(ctx, "Select an algorithm category:", bot.algo_menu_list, "Markdown");
        }        
    );

    // S2: Handle category selection action
    for (const category of Object.keys(algorithms)) {
        bot.customAction(
            category,
            async (ctx) => {
                    const algo_list = await Object.values(algorithms[category])
                    .map((algo, index) => `${index + 1}. ${algo.name}`)
                    .join("\n");
                    await bot.sendReplyMessage(ctx, `Algorithms under *${category}*:\n\n${algo_list}\n\n Type the name to get details.`, [], "Markdown");
            }
            
        );
    }

    // S3: Handle Algorithm Search
    bot.customHear(/^(?!\/).+/, async (ctx) => {
        const raw_input = ctx.message.text || ""; // Handle undefined cases
        const user_input = sanitizeHtml(raw_input.trim().toLowerCase()); // Sanitize input
        
        if (!user_input) return; // Ignore empty messages

        let req_alg = null;
    
        for (const category in algorithms) {
            req_alg = Object.values(algorithms[category]).find(algo =>
                algo.name.toLowerCase().includes(user_input)
            );
            if (req_alg) break;
        }
    
        if (req_alg) {
            await ctx.reply(
                `*${req_alg.name}*\n\n *Description:* ${req_alg.description}\n\n` +
                `\`\`\`js\n${req_alg.code}\n\`\`\`\n` +
                `*Time Complexity:* ${req_alg.time_complexity}\n` +
                `*Space Complexity:* ${req_alg.space_complexity}`,
                { parse_mode: "Markdown" }
            );
        } else {
            await ctx.reply(
                "Oops! Maybe it's hiding? 🕵️‍♂️\n Try something else! 😆",
                { parse_mode: "Markdown", ...bot.defaultMenuMarkup() },
            );
        }
    });    

}; // End of algosFetcherActionsHandler