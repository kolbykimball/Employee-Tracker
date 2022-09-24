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

viewDepartments = () => {
    console.log('Showing all departments.../n');
    const sql = 'SELECT department.id AS id, department.name AS department FROM department';

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        mainMenu();
    });
};

viewRoles = () => {
    console.log('Showing all roles.../n');
    const sql = 'SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id';

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        mainMenu();
    });
};

viewEmployees = () => {
    console.log('Showing all employees.../n');
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id';

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        mainMenu();
    });
};
