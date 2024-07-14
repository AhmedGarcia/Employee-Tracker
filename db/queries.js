// Import the PostgreSQL client from the connection file
const client = require('../config/connection');

//Function to get all departments from database
const getAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');// Execute SQL query to get all departments
    return res.rows;// Return the result rows
};
// Function to get all roles along with their associated department names
const getAllRoles = async () => {
    const res = await client.query(`
        SELECT role.id, role.title, role.salary, department.name AS department FROM role
        JOIN department ON role.department_id = department.id
        `);  //SQL query to get all roles and their departments
        return res.rows;
};