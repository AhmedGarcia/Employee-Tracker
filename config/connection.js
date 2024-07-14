// Import the pg library for PostgreSQL
const { Client } = require('pg');

// creates a new postgresql client instance
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'password',
    port: 5432,
});

// connects to the postgresql database
client.connect();

// Export the client for use in other modules
module.exports = client;