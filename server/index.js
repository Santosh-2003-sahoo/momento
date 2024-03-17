// Import the required modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Import routes
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// Initialize dotenv
dotenv.config();

// Create express app
const app = express();

// Set up middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Set up routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Define a simple route
app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
});

// Define port
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start the server
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if MongoDB connection fails
    });
