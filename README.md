# Invoices App - MERN Stack

## Introduction

This repository contains the code for a MERN (MongoDB, Express.js, React, Node.js) stack application for managing invoices. The project is divided into two folders: `frontend` for the Vite/React frontend and `backend` for the MERN stack backend.

## Short Showcase Video

[![YouTube Thumbnail](demo-images/yt-img.png)](https://www.youtube.com/watch?v=f_9hX3UU2u0)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js and npm](https://nodejs.org/)
- [MongoDB Atlas Account](https://www.mongodb.com/)

### Clone the Repository

```bash
git clone https://github.com/vuleta-dev/Invoices-App-MERN-Stack.git
```


## Frontend Setup


Navigate to the frontend directory:

```bash
cd frontend
```

Create a .env file in the frontend directory and specify the API URL:

```bash
VITE_REACT_APP_API_URL=http://localhost:4000/api/
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will be accessible at http://localhost:5174/

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a .env file in the backend directory and define the following:
```bash
PORT=4000
MONGO_URI=<Your MongoDB Atlas Connection String>
```

Replace <Your MongoDB Atlas Connection String> with your actual MongoDB Atlas connection string.

Install dependencies:
```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The backend will be running at http://localhost:4000

Now, the Invoices App should be fully functional locally.

