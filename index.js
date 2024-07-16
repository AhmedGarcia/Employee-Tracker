const inquirer = require('innquirer');

const {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} = require('./db/queries');


const mainMenu = async () => {
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

    //Handles the user choice
    switch (action) {
        case 'View all departments':
            const departments = await getAllDepartments(); //Calls function to get all depts
            console.table(departments); // Displays all departments in a table
            break;
        case 'View all roles':
            const roles = await getAllRoles(); // Calls function to get all roles
            console.table(roles); //Displays all roles in table   
            break;
        case 'View all employees':
            const employees = await getAllEmployees(); //Calls function to get all employees
            console.table(employees); //Displays all employees in table
            break; 
        case 'Add a department':
            const { departmentName } = await inquirer.prompt({ // Prompt the user for the department name
                name: 'departmentName',
                type: 'input',
                message: 'Enter the name of the department:',
            });
            await addDepartment(departmentName); // Add the new department
            console.log(`Added department: ${departmentName}`);
            break;
        case 'Add a role':
            const departmentsList = await getAllDepartments(); // Get all departments for selection
            const departmentChoices = departmentsList.map(({ id, name}) => ({ name, value: id })); 
            // Prompt the user for role details
            const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt([ 
                {
                    name: 'roleTitle',
                    type: 'input',
                    meassage: 'Enter the title of the role:',
                },
                {
                    name: 'roleSalary',
                    type:'input',
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
            console.log(`Added role: ${roleTitle}`) ;
            break;
            case 'Add an employee':
                const roleList = await getAllRoles(); // Get all roles for selection
                constroleChoices = roleList.map(({ id, title}) => ({ name: title, value: id}));
                const employeesList = await getAllEmployees(); // Get all employees for selection as managers
                const managerChoices = employeesList.map(({ id, first_name, last_name}) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                }));
                managerChoices.unshift({ name: 'None', value: null}); // Add "None" option for no manager. The unshift method is adding an object with the properties name and value to the beginning of the managerChoices array

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
            await addEmployee(firstName, lastName, employeeRole, employeeManager);// Add the new employee
            console.log (`Added employee: ${firstName} ${lastName}`);
            break;
            case 'Update employee role':
                const employeeListToUpdate = await getAllEmployees();
                const employeeChoices = employeeListToUpdate.map(({ id, first_name, last_name}) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                }));
                const roleChoicesForUpdate = rolesList.map(({ id, title}) => ({name: title, value: id}));
                //Prompt user to select an employee and their new role
                const { employeeId, newRoleId } = await inquirer.prompt([
                    {
                        name: 'employeeId',
                        type: 'list',
                        message: 'Select tghe employee to update:',
                        choices: employeeChoices,
                    },
                    {
                        name: 'newRoleId',
                        type: 'list',
                        message: 'Select the new role for the employee:',
                        choices: roleChoicesForUpdate,

                    },

                ]);
                await updateEmployeeRole(employeeId, newRoleId)// Updates the employee's role
                console.log(`Updated employee's role`);
                break;
            case 'EXIT':
                process.exit();// Exits the application
    }
    await mainMenu();// Show the main menu again after an action is completed
};

mainMenu();