// Import the PostgreSQL client from the connection file
const client = require('../config/connection');

//Function to get all departments from database
const getAllDepartments = async () => {
  try {

    const res = await client.query('SELECT * FROM department');// Execute SQL query to get all departments
    return res.rows;// Return the result rows
} catch (err) {
        console.error("Error  fetching departments:", err);
        throw err;
    }
};


// Function to get all roles along with their associated department names
const getAllRoles = async () => {
  try {
    const res = await client.query(`
        SELECT role.id, role.title, role.salary, department.name AS department FROM role
        JOIN department ON role.department_id = department.id
        `);  //SQL query to get all roles and their departments
        return res.rows;
} catch (err) {
            console.error("Error fetching roles:", err);
            throw err;
        }
};


// Function to get all employees along with their roles, departments, and managers. LEFT JOIN ensures that all records from the left table (employee aliased as e in this case) are included in the result set
const getAllEmployees = async () => {
  try {
    const res = await client.query (`
        SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id 
        `);
        return res.rows;
} catch (err) {
            console.error("Error fetching employees:", err);
            throw err;
        }
};


// Adds/inserts a new department to the database
const addDepartment = async (name) => {
  try {
    const res = await client.query(
        'INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0]; // Return the newly added department
} catch (err) {
        console.error("Error adding department:", err);
        throw err;
    }
};


//  Adds/inserts a new role to the database
const addRole = async (title, salary, department_id) => {
  try {
    const res = await client.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', 
        [title, salary, department_id]
    );
    return res.rows[0];// Return the newly added role
} catch (err) {
        console.error("Error adding role:", err);
        throw err;
    }
};


const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  try {
    const res = await client.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, role_id, manager_id]
    );
    return res.rows[0];// Return the newly added employee
} catch (err) {
        console.error("Error adding employee:", err);
        throw err;
    }
};


//Updates employees role in database
const updateEmployeeRole =  async (employee_id, role_id) => {
  try {
    const res = await client.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
        [role_id, employee_id]
    );
    return res.rows[0]; //// Return the updated employee
} catch (err) {
        console.error("Error updating employee role:", err);
        throw err;
    }

};


module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};

