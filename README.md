# MindCare AI Chatbot

A mental healthcare chatbot application using the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
mindcare-ai/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/ # ChatWindow, MessageBubble, MoodSelector, Disclaimer
│   │   ├── pages/      # Home
│   │   ├── services/   # api.js
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Node + Express Backend
│   ├── controllers/    # chatController.js
│   ├── models/         # User, Chat, Mood
│   ├── routes/         # chatRoutes
│   ├── middleware/     # crisisDetection, rateLimiter
│   ├── config/         # db.js
│   └── server.js
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas Account (for database)

### Setup

1.  **Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

2.  **Backend**
    ```bash
    cd server
    npm install
    # Rename .env.example to .env and add your keys
    npm run dev
    ```

## Tech Stack

-   **Frontend**: React + Vite
-   **Backend**: Node.js + Express
-   **Database**: MongoDB (Atlas)
-   **AI Integration**: OpenAI (Placeholder ready)
-   **Safety**: Custom crisis detection middleware
