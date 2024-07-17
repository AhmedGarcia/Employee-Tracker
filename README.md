# Employee-Tracker

## Description

A command-line application to manage a company's employee database using Node.js, Inquirer, and PostgreSQL. This application allows you to view and manage departments, roles, and employees in your company.

## Table of Content## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Installation

Follow these steps to set up the project:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/Employee-Tracker.git
   cd Employee-Tracker
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up the PostgreSQL database**:

   * Ensure PostgreSQL is installed and running.

   * Create a .env file in the root of the project with the following content (replace placeholders with your actual PostgreSQL credentials):

   ```plaintext
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=employee_tracker
   ```

4. **Create and set up the database**:

   * Open your terminal or command line and run the following command to create the database:

   ```sh
   psql -U postgres -c "CREATE DATABASE employee_tracker;"
   ```
5. **Run the Schema script**:

    Next, run the schema script to create the necessary tables. Make sure you are in the directory where db/schema.sql is located:

   ```sh
   psql -U postgres -d employee_tracker -f db/schema.sql
   ```

6. **Run the  Seed script**:

    Finally, run the seed script to populate the tables with initial data:

    ```sh
    psql -U postgres -d employee_tracker -f db/seeds.sql
    ```

## Usage

To start the application, run the following command:

```sh
node index.js
```

## Application Functionality

When you run the application, you will be presented with the following options:

* View all departments: Displays a table of all departments.

* View all roles: Displays a table of all roles with their respective departments and salaries.

* View all employees: Displays a table of all employees with their roles, departments, salaries, and managers.

* Add a department: Prompts you to enter the name of a new department.

* Add a role: Prompts you to enter the name, salary, and department for a new role.

* Add an employee: Prompts you to enter the first name, last name, role, and manager for a new employee.

* Update an employee role: Prompts you to select an employee and assign a new role to them.

* Exit: Exits the application.

## Database Schema

The database schema includes the following tables:

  1. **department**:

    * id: SERIAL PRIMARY KEY

    * name: VARCHAR(30) UNIQUE NOT NULL

  2. **role**:
    
    * id: SERIAL PRIMARY KEY

    * title: VARCHAR(30) UNIQUE NOT NULL

    * salary: DECIMAL NOT NULL

    * department_id: INTEGER NOT NULL REFERENCES department(id)

  3. **epmloyee**:

    * id: SERIAL PRIMARY KEY

    * first_name: VARCHAR(30) NOT NULL

    * last_name: VARCHAR(30) NOT NULL

    * role_id: INTEGER NOT NULL REFERENCES role(id)

    * manager_id: INTEGER REFERENCES employee(id)

## Technologies Used

* Node.js: JavaScript runtime for server-side development.

* Inquirer: Package for creating interactive command-line prompts.

* PostgreSQL: Relational database management system.

* pg: Node.js package for interacting with PostgreSQL.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and passes all tests.

## Contact

If you have any questions about the project, please open an issue or contact me directly at: 

email: ahmed.garcia.ramos@gmail.com

You can find more of my work at:

GitHub: https://github.com/AhmedGarcia