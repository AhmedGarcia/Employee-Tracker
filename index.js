// Import the inquirer package for command-line interaction
const inquirer = require('inquirer');

// Import query functions from the queries file
const {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} = require('./db/queries');

// Function to display the main menu and handle user actions
const mainMenu = async () => {
    try {
        // Prompt the user for an action
        const { action } = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        });

        // Handle the user's choice
        switch (action) {
            case 'View all departments':
                const departments = await getAllDepartments(); // Get all departments
                console.table(departments); // Display departments in a table
                break;
            case 'View all roles':
                const roles = await getAllRoles(); // Get all roles
                console.table(roles); // Display roles in a table
                break;
            case 'View all employees':
                const employees = await getAllEmployees(); // Get all employees
                console.table(employees); // Display employees in a table
                break;
            case 'Add a department':
                // Prompt the user for the department name
                const { departmentName } = await inquirer.prompt({
                    name: 'departmentName',
                    type: 'input',
                    message: 'Enter the name of the department:',
                });
                await addDepartment(departmentName); // Add the new department
                console.log(`Added department: ${departmentName}`);
                break;
            case 'Add a role':
                const departmentsList = await getAllDepartments(); // Get all departments for selection
                const departmentChoices = departmentsList.map(({ id, name }) => ({ name, value: id }));
                // Prompt the user for role details
                const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt([
                    {
                        name: 'roleTitle',
                        type: 'input',
                        message: 'Enter the title of the role:',
                    },
                    {
                        name: 'roleSalary',
                        type: 'input',
                        message: 'Enter the salary for the role:',
                    },
                    {
                        name: 'roleDepartment',
                        type: 'list',
                        message: 'Select the department for the role:',
                        choices: departmentChoices,
                    },
                ]);
                await addRole(roleTitle, roleSalary, roleDepartment); // Add the new role
                console.log(`Added role: ${roleTitle}`);
                break;
            case 'Add an employee':
                const rolesList = await getAllRoles(); // Get all roles for selection
                const roleChoices = rolesList.map(({ id, title }) => ({ name: title, value: id }));
                const employeesList = await getAllEmployees(); // Get all employees for selection as managers
                const managerChoices = employeesList.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                }));
                managerChoices.unshift({ name: 'None', value: null }); // Add "None" option for no manager
                // Prompt the user for employee details
                const { firstName, lastName, employeeRole, employeeManager } = await inquirer.prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'Enter the first name of the employee:',
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Enter the last name of the employee:',
                    },
                    {
                        name: 'employeeRole',
                        type: 'list',
                        message: 'Select the role for the employee:',
                        choices: roleChoices,
                    },
                    {
                        name: 'employeeManager',
                        type: 'list',
                        message: 'Select the manager for the employee:',
                        choices: managerChoices,
                    },
                ]);
                await addEmployee(firstName, lastName, employeeRole, employeeManager); // Add the new employee
                console.log(`Added employee: ${firstName} ${lastName}`);
                break;
            case 'Update an employee role':
                const employeesListToUpdate = await getAllEmployees(); // Get all employees for selection
                const employeeChoices = employeesListToUpdate.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                }));
                const roleChoicesForUpdate = rolesList.map(({ id, title }) => ({ name: title, value: id }));
                // Prompt the user to select an employee and their new role
                const { employeeId, newRoleId } = await inquirer.prompt([
                    {
                        name: 'employeeId',
                        type: 'list',
                        message: 'Select the employee to update:',
                        choices: employeeChoices,
                    },
                    {
                        name: 'newRoleId',
                        type: 'list',
                        message: 'Select the new role for the employee:',
                        choices: roleChoicesForUpdate,
                    },
                ]);
                await updateEmployeeRole(employeeId, newRoleId); // Update the employee's role
                console.log(`Updated employee's role`);
                break;
            case 'Exit':
                console.log("Goodbye!");
                return; // Exit the function without recalling mainMenu
        }

        await mainMenu(); // Show the main menu again after an action is completed
    } catch (error) {
        console.error("An error occurred:", error); // Log any errors
        process.exit(1); // Exit the process with an error code
    }
};

// Start the application by displaying the main menu
mainMenu();