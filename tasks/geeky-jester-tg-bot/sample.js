/***************************************************/
/*************** SAMPLE PRACTICE *******************/
/***************************************************/
"use strict";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables


import { Telegraf } from "telegraf";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("BOT_TOKEN is missing");
  process.exit(1);
}

try {
    const bot = new Telegraf(BOT_TOKEN);

    // Start command
    bot.start((ctx) => ctx.reply("Hello! I'm your test bot"));
    
    // Ping command to check bot is running
    bot.command("ping", (ctx) => ctx.reply("Pong!"));
    
    bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));
    
    bot.launch();
    console.log("Bot is running... Waiting for messages!");
    
    // Graceful Shutdown Handling
    process.once('SIGINT', () => {
      console.log("Bot is stopping (SIGINT)...");
      bot.stop('SIGINT');
      process.exit(0);  // Ensure process exits cleanly
    });
    
    process.once('SIGTERM', () => {
      console.log("Bot is stopping (SIGTERM)...");
      bot.stop('SIGTERM');
      process.exit(0);
    });    
} catch(e) {
    console.log('unexpected error', e);
}