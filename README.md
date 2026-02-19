# Modular Conversation Flow Backend

Backend service for a modular conversation flow system.

Deployed_Link: https://question-based-flow.onrender.com/

## 🚀 Tech Stack

- Node.js
- Express
- MySQL
- Sequelize ORM

---

## 🏗️ Features Implemented

- Start Module
- Submit Answer
- Module Switching
- Conversation History Preservation
- Active State Management
- Checkpoint Logic (Session Reset)
- Deep Link Validation
- Defensive Error Handling
- Bonus: Back Navigation

---

## 🗄️ Database Design

Tables:

- Users
- Modules
- Questions
- Options
- UserActiveStates
- ConversationHistories

Key Concept:
- Conversation history is permanent.
- Active state tracks current position.
- moduleSessionId handles checkpoint resets.

---

## 🛠️ Setup Instructions

1. Clone repo
2. Install dependencies:

   npm install

3. Create MySQL database:

   CREATE DATABASE conversation_db;

4. Add .env file:

   PORT=5000,
   DB_PORT=database_port
   DB_NAME=database_name,
   DB_USER=db_user,
   DB_PASSWORD=yourpassword,
   DB_HOST=db_host

6. Seed database:

   npm run seed
   
8. Run server:

   npm run dev

---

## 📬 API Endpoints

### Start Module
POST /modules/:moduleId/start

### Submit Answer
POST /users/:userId/answer

### Deep Link Handling
GET /users/:userId/questions/:questionId

### Back Navigation (Bonus)
POST /users/:userId/back

---

## 🧠 Design Decisions

- Used moduleSessionId to implement checkpoint logic.
- Preserved complete conversation history.
- Defensive validation against invalid flows.
- Used Sequelize ORM for relational mapping.
