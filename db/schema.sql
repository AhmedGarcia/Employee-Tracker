-- Creates the department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY, -- Primary key, auto-incrementing
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Creates the role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY, -- Primary key, auto-incrementing
    title VARCHAR(30) UNIQYE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
);

-- Creates the employee table.
CREATE TABLE employee (
    id SERIAL PRIMARY KEY, -- Primary key, auto-incrementing
    first_name VARCHAR(30),
    last_name VARCHAR (30),
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id)
);