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
            const { departmentName } = await inquirer.prompt({
                name: 'departmentName',
                type: 'input',
                message: 'Enter the name of the department:',
            });
            await addDepartment(departmentName);
            console.log(`Added department: ${departmentName}`);
            break;
        case 'Add a role':
            const departmentsList = await getAllDepartments();
            const departmentChoices = departmentsList.map(({ id, name}) => ({ name, value: id })); 
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
            await addRole(roleTitle, roleSalary, roleDepartment);  
            console.log(`Added role: ${roleTitle}`) ;
            break;
    }
}