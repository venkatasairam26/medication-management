# Medication Management System

A full-stack web application for managing medications, built with MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (Register/Login)
- Role-based access (Patient/Caretaker)
- Add, view, update, and delete medications
- Medication schedule tracking
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn
- SQLite (for local database)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd medication-management
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3001
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:3001`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## Available Scripts (Frontend)

In the frontend directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Available Scripts (Backend)

In the backend directory, you can run:

- `npm start` - Starts the backend server
- `npm run dev` - Starts the server in development mode with nodemon

## Environment Variables

### Backend

```
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Medications
- `GET /api/medication` - Get all medications (requires authentication)
- `POST /api/medication` - Add a new medication (requires authentication)
- `PUT /api/medication/:id` - Update a medication (requires authentication)
- `DELETE /api/medication/:id` - Delete a medication (requires authentication)

## Project Structure

```
medication-management/
├── backend/               # Backend server code
│   ├── node_modules/      # Backend dependencies
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies and scripts
│   └── .env               # Environment variables
├── frontend/              # Frontend React application
│   ├── node_modules/      # Frontend dependencies
│   ├── public/            # Static files
│   ├── src/               # Source files
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies and scripts
│   └── .env               # Frontend environment variables
└── README.md              # This file
```

## Deployment

### Backend Deployment

1. Push your code to a GitHub repository
2. Deploy to a platform like Render, Heroku, or Railway
3. Set up environment variables in the deployment platform

### Frontend Deployment

1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to a static hosting service like Vercel, Netlify, or GitHub Pages

## Troubleshooting

- If you encounter dependency issues, try deleting `node_modules` and `package-lock.json` and run `npm install` again
- Make sure all environment variables are properly set
- Check the console for any error messages

## Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


