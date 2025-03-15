# 🎭 **Geeky Jester Bot** – Fun & Learning Combined!  

## 📝 **About**  
**Geeky Jester** is a fun and interactive Telegram bot that combines entertainment and learning. From cracking jokes to rolling dice and exploring algorithms, this bot brings joy and knowledge at your fingertips!  

---

## 🎯 **Key Features**  

A **feature-rich Telegram bot** built using **Node.js & Telegraf**, providing utilities such as:
- 🎲 **Dice Roller** – Roll a virtual dice (1-6) and see your outcome.
- 🎭 **Jokes Fetcher** – Get a random joke whenever you need a laugh.
- 📚 **Algorithm Explorer** – Explore various algorithm categories with detailed explanations, code snippets, and complexity analysis.

---

## 🛠 **Installation**

### **1️⃣ Prerequisites**
Ensure the following are set up before you proceed:
- **Node.js** (>= 18.x)
- **Telegram Bot API Token**: Get it from [BotFather](https://t.me/botfather)

### **2️⃣ Setup Environment Variables**
Create a `.env` file in the project root and add the following lines with your respective values:

```
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
API_URL=JOKES_API_URL
```

---

## 🏗️ **Project Structure**

```
📂 geeky-jester-tg-bot
 ├── 📂 src                 # Source directory for your code
 │   ├── 📂 core            # Core logic of the bot
 │   │   ├── config/constants.js    # Constants & Configs
 │   │   ├── services/bot.service.js # Core Bot Service Logic
 │   │
 │   ├── 📂 actions         # Actions performed by the bot
 │   │   ├── dice.action.js  # Dice Roll Action
 │   │   ├── joke.action.js # Jokes Action
 │   │   ├── algo.action.js # Algorithms Fetcher
 │   │   ├── index.js        # Core Register Actions
 │   │
 │   ├── 📂 data            # Data files
 │   │   ├── algos.js        # Algorithm Data
 │   │
 ├── 📂 bot.js                # Main Bot Entry Point
 ├── 📂 package.json
 ├── 📂 README.md
```

---

### 📌 **Navigation Commands**  

- `/start` – Start the bot and view the available features.  
- `/help` – Get help with bot commands.  
- `/menu` – Open the main menu for easy access.
- `/dice` – Roll a dice and test your luck.    
- `/joke` – Fetch a random joke instantly. 
- `/algos` – Explore different algorithm categories. 

---

### **🚀 Happy Coding!**

---
