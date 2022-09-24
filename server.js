const mysql = require('mysql12');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
})

connection.connect(err => {
    if (err) throw err;
})

const startPrompt = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select an option:',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Update Employee Role',
                'Update Employee Manager',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Exit'
            ]
        }
    ])
        .then((answers) => {
            const { choices } = answers;

            if (choices === 'View All Employees') {
                viewAllEmployees();
            }

            if (choices === 'View All Departments') {
                viewAllDepartments();
            }

            if (choices === 'Add Employee') {
                addEmployee();
            }

            if (choices === 'Update Employee Role') {
                updateEmployeeRole();
            }

            if (choices === 'Update Employee Manager') {
                updateEmployeeManager();
            }

            if (choices === 'View All Roles') {
                viewAllRoles();
            }

            if (choices === 'Add Role') {
                addRole();
            }

            if (choices === 'Add Department') {
                addDepartment();
            }           

            if (choices === 'Exit') {
                connection.end();
            }
        });
};

