-- Drop tables if they exist
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS department CASCADE;

-- Creates the department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY, -- Primary key, auto-incrementing
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Creates the role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY, -- Primary key, auto-incrementing
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
);

-- Creates the employee table.
CREATE TABLE employee (
    id SERIAL PRIMARY KEY, -- Primary key, auto-incrementing
    first_name VARCHAR(30),
    last_name VARCHAR (30),
    role_id INTEGER NOT NULL REFERENCES role(id), -- foreign key. It establishes a relationship between the employee table and the role table, indicating which role an employee holds.
    manager_id INTEGER REFERENCES employee(id) -- foreign key.  It establishes a hierarchical relationship within the employee table, indicating that an employee can have a manager who is also an employee. 
);