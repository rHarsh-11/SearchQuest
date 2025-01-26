# Questions Search Application

## Overview
A web application for searching and managing questions with a full-stack JavaScript implementation.

## Project Structure
```
questions-search-app/
├── backend/
│   ├── .env
│   ├── server.js
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── questions.json
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
```

## Technologies Used
- Backend: Node.js, Express.js
- Frontend: React.js
- Database: MongoDB
- Data Storage: JSON file

## Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- MongoDB

## Installation

### Backend Setup
1. Navigate to backend directory
```bash
cd backend
npm install
```

2. Create a `.env` file with necessary configurations

3. Start MongoDB server
```bash
# On macOS
brew services start mongodb-community
# On Linux
sudo systemctl start mongod
# On Windows
net start MongoDB
```

4. Import initial data
```bash
cd backend
npm run import
```

### Frontend Setup
1. Navigate to frontend directory
```bash
cd frontend
npm install
```

## Running the Application

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm start
```
