/** 
 * @module       Service
 * @description  BotService - a custom wrapper for Telegram bot workflow handlings 
 * @author       Thasnim
 * @createdOn    2025
 **/
"use strict";

import { Telegraf, Markup } from "telegraf";

// constants required in this service
const DEFAULT_HELP_HANDLER_TEXT = "🤖 Here are the available commands:\n/start - Begin the bot\n/help - Get assistance.\n";
const MAIN_MENU_HEADING_TEXT = "🏠 Main Menu:";
const UNKNOWN_USER = "unknown user";
const ACTION_ERROR_MSG = "Oops! Something went wrong.";
const SELECT_AN_OPTION = 'Select an option:';

/***************************************************/
/************** BOT SERVICE CLASS ******************/
/***************************************************/

class BotService {
    /**
     * Initializes the bot service.
     * @param {Object} config - The configuration object containing bot settings.
     */
    constructor(config) {
        if (!config?.BOT_TOKEN) throw new Error("Bot token is required.");

        this.bot = new Telegraf(config.BOT_TOKEN);
        this.config = config;       
        this.greeting = config.greeting || "Hello! Welcome to the bot!";
        this.default_timeout = config.default_timeout || 200;
        this.commands = config.COMMANDS || {};
        this.commands_list = config.COMMANDS_LIST || [];
        this.menu_list = config.MENU_LIST || [];
        this.algo_commands = config.ALGO_COMMANDS || {};
        this.algo_menu_list = config.ALGO_MENU_LIST || [];
        
    }
    
    /**
     * Starts the bot with a default greeting.
     */
    start(menu_list = []) {
        //this.bot.start((ctx) => ctx.reply(this.greeting));
        this.bot.start(async (ctx) => {
            await this.sendReplyMessage(ctx, this.greeting);
            if (menu_list.length > 0) {    
                       
               // Instead of setTimeout, use await with delay
               await new Promise(resolve => setTimeout(resolve, this.default_timeout));

               await this.sendReplyMessage(ctx, SELECT_AN_OPTION, menu_list);
            }
        });
    }

    /**
     * Starts the bot and handles graceful shutdown.
     */
    launch() {       

        this.bot.launch();

        console.log("Hurray! Geeky Jester Bot is up and running...");

        process.once("SIGINT", () => this.#stop("SIGINT"));
        process.once("SIGTERM", () => this.#stop("SIGTERM"));
    }   

    /**
     * @private: Stops the bot and exits the process.
     * @param {string} signal - Termination signal (SIGINT or SIGTERM).
     */
    #stop(signal) {
        console.log(`Bot is stopping (${signal})...`);
        this.bot.stop(signal);
        process.exit(0);
    }     

    /**
     * Default menu
     */
    menu(menu_list = [], menu_name = 'menu', menu_msg = SELECT_AN_OPTION) {

        const cb = async (ctx) => {
            await this.sendReplyMessage(ctx, menu_msg, menu_list);
        };        
        // register command and actions
        this.bot.command(menu_name, cb);
        this.bot.action(menu_name, cb);        
    }

    /**
     * Help menu
     */
    customHelp(command_name = 'help', menu_msg = DEFAULT_HELP_HANDLER_TEXT) {

        const cb = async (ctx) => {
            await this.sendReplyMessage(ctx, menu_msg);
        };   
        // register command and actions
        this.customCommand(command_name, cb); // Handle command input like "/help"       
        this.customAction(command_name, cb); // register button actions          
    }
    
    /**
     * Enhanced command handler with logging and error handling
     */
    customCommand(command_name, cb) {         
        this.bot.command(command_name, async (ctx) => { 
            try {
                console.log(`Command executed: /${command_name} by ${ctx.from.username || UNKNOWN_USER}`);
                await cb(ctx);
            } catch (error) {
                console.error(`Error in command ${command_name}:`, error);
                ctx.reply(ACTION_ERROR_MSG);
            }
        }); 
    }

    /**
     * Enhanced hear handler with logging
     */
    customHear(trigger, cb) {        
        this.bot.hears(trigger, async (ctx) => {
            try {
                console.log(`Message heard: ${trigger} by ${ctx.from.username || UNKNOWN_USER}`);
                await cb(ctx);
            } catch (error) {
                console.error(`Error in hear event for ${trigger}:`, error);
                ctx.reply(ACTION_ERROR_MSG);
            }
        });
    }

    /**
     * Enhanced action handler for inline keyboard clicks
     */
    customAction(action_name, cb) {        
        this.bot.action(action_name, async (ctx) => {
            try {
                await ctx.answerCbQuery();  // Acknowledge button click globally
                console.log(`Button clicked: ${action_name} by ${ctx.from.username || UNKNOWN_USER}`);
                await cb(ctx);
            } catch (error) {
                console.error(`Error in action ${action_name}:`, error);
                ctx.reply(ACTION_ERROR_MSG);
            }
        });
    }

    /**
     * Registering default commands to a bot
     */
    defaultSetMyCommands() {

        const commands = [
            { command: "start", description: "Start the bot" },           
            { command: "menu", description: "Open menu" },
            { command: "help", description: "Get help" },
        ];
        
        this.bot.telegram.setMyCommands(commands)
            .then(() => console.log("Commands registered successfully"))
            .catch(err => console.error("Error registering commands:", err));
        
    }

    /**
     * @private: Registers the bot commands.
     * @param {string|null} command_name to register 
     */
    async #registerCommands(command_name = null) {
        try {
            const selected_commands = command_name
                ? this.commands_list.filter(cmd => cmd.command === command_name) 
                : this.commands_list;     

                if (selected_commands.length > 0) {
                    await this.bot.telegram.setMyCommands(selected_commands);                   
                }
        } catch (error) {
            console.error("Error registering bot commands:", error);
        }
    }     
    
    /**
     * @private: Creates an inline keyboard dynamically.   
     * @param {Array} buttons - Array of objects with { text, callback }.
     * @returns {Markup} - Inline keyboard markup.
     */
    #createInlineKeyboard(buttons) {
        return Markup.inlineKeyboard(buttons.map((btn) => [Markup.button.callback(btn.btn_text, btn.call_back)]));
    }   

    /**
     * Generates reply options for sending messages.
     * @param {string} parse_mode - The text formatting mode (e.g., 'Markdown', 'HTML').
     * @param {boolean} disable_web_page_preview - Whether to disable link previews (default: false).
     * @param {boolean} disable_notification - Whether to send the message silently (default: false).
     * @param {boolean} protect_content - Whether to protect the content from forwarding (default: false).
     * @returns {Object} - The formatted reply options.
     */
    parseReplyOptions(
        buttons = [],
        parse_mode = '', 
        disable_web_page_preview = false, 
        disable_notification = false, 
        protect_content = false 
   ) {
       
        const keyboard_btns = buttons.length ? this.#createInlineKeyboard(buttons) : undefined;
        return { parse_mode, disable_web_page_preview, disable_notification, protect_content, ...keyboard_btns };
    }        
    
    /**
     * Initializes bot commands, actions of default start, menu and help events
     */
    setupCommands(menu_action = 'menu', menu_list = [], msg = MAIN_MENU_HEADING_TEXT) {
        // Register default commands  
        //this.#registerCommands();   // if all commands want to register 
        this.defaultSetMyCommands();  // only default set my commands start, help
        
        // Register default commands
        this.start(this.menu_list);
        
        // Register help commands and actions
        this.customHelp();     
        
        // Register help commands and actions
        this.menu(this.menu_list, this.commands.MENU,  msg);       
    }     
    
    /**
     * Creates the default basic menu buttons.
     * @returns {Markup.Markup} Inline keyboard markup for the menu.
     */
    defaultMenuMarkup() {
        return Markup.inlineKeyboard([            
            [Markup.button.callback("📜 Back to Algorithms", this.commands.ALGOS)],
            [Markup.button.callback("🔙 Back to Menu", this.commands.MENU)],
        ]);
    }
    
    /**
     * @private: Sends a message with optional inline keyboard.
     * @param {Object} ctx - Telegram context.
     * @param {string} text - Message text.
     * @param {Array} buttons - Optional array of button objects ({ text, callback }).
     */
    async sendReplyMessage(ctx, text, buttons = [], given_parse_mode = '') {       
        try {
            const reply_options = this.parseReplyOptions(buttons, given_parse_mode);

            // Send with correctly structured options 
            await ctx.reply(text, reply_options);

        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }     

} //End of BotService

export default BotService;
