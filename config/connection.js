// Import the pg library for PostgreSQL
const { Client } = require('pg');
// Load environment variables from .env file
require('dotenv').config();


// creates a new postgresql client instance
const client = new Client({
    user: process.env.DB_USER,      // PostgreSQL username from environment variable
    host: process.env.DB_HOST,      // PostgreSQL server host from environment variable
    database: process.env.DB_DATABASE,  // Database name from environment variable
    password: process.env.DB_PASSWORD,  // PostgreSQL password from environment variable
    port: process.env.DB_PORT,      // Default PostgreSQL port from environment variable
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error("Database connection error:", err));

module.exports = client;

// Export the client for use in other modules
module.exports = client;