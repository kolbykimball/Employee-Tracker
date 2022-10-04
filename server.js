const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
})

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

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
            
            if (choices === 'View All Roles') {
                viewAllRoles();
            }

            if (choices === 'Add Employee') {
                addEmployee();
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
viewAllEmployees = () => {
    console.log('Showing all employees.../n');
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id';

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startPrompt();
    });
};

viewAllRoles = () => {
    console.log('Showing all roles.../n');
    const sql = 'SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id';

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startPrompt();
    });
};

viewAllDepartments = () => {
    console.log('Showing all departments.../n');
    const sql = 'SELECT department.id AS id, department.name AS department FROM department';

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startPrompt();
    });
};




addEmployee = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employee's first name?"
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employee's last name?"
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager's ID?"
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: "What is this employee's role?"
                }
            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Employee has been added!');
                        startPrompt();
                    })
            })
    })
};

 const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Department has been added!');
                console.table('All Departments:', res);
                startPrompt();
                })
            })
};

addRole = () => {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'new_role',
                type: 'input',
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: "What is the salary of this role?"
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArray = [];
                    for (let i =0; i <res.length; i++) {
                        deptArray.push(res[i].name);
                    }
                    return deptArray;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
            connection.query(
                'INSERT INTO role SET?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err) throw err;
                    console.log('New role has been added.');
                    var query = 'SELECT * FROM role';
                    connection.query(query, function(err, res) {
                    if(err)throw err;
                    console.table('All Roles:', res);
                    startPrompt();
                    })
                  
                })
        })
    })
};