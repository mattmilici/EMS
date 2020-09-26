const inquirer = require("inquirer");
const orm = require("./queryRequests/orm");
const cTable = require("console.table");

kickOff();

function kickOff() {
    inquirer
        .prompt([{
            name: "startingPrompt",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Add role",
                "Add department",
                "Remove Employee",
                "Update Employee Role and/or Department",
            ],
        }, ])
        .then(function(response) {
            const answer = response.startingPrompt;
            switch (answer) {
                case "View All Employees":
                    //displays table of all employees
                    orm.CompanyDetailByEmployee(kickOff);
                    break;
                case "View All Employees by Department":
                    viewAllEmpByDep(kickOff);
                    break;
                case "View by Table":
                    viewByTable(kickOff);
                    break;
                case "View All Employees by Manager":
                    viewEmployeesByManager(kickOff);
                    break;
                case "Add Employee":
                    addNewemployee(kickOff);
                    break;
                case "Add role":
                    newRole(kickOff);
                    break;
                case "Add department":
                    addNewDepartment(kickOff);
                    break;
                case "Remove Employee":
                    removeEmployee(kickOff);
                    break;
                case "Update Employee Role and/or Department":
                    updateEmployee(kickOff);
                    break;
            }
        });
}

//prompt generated if the user selects to view employees by deparment
function viewAllEmpByDep(callback) {
    let departmentArray = [];
    orm
        .getDepartments("SELECT department.name FROM department")
        .then((message) => {
            for (let i = 0; i < message.length; i++) {
                let department = message[i].name;
                departmentArray.push(department);
            }
            inquirer
                .prompt([{
                    name: "viewbyDepartment",
                    type: "list",
                    message: "What department do you want to filter on?",
                    choices: departmentArray,
                }, ])
                .then(function(response) {
                    const answer = response.viewbyDepartment;
                    orm.EmployeesByID(answer);
                    callback();
                });
        })
        .catch(function(error) {
            console.log("not Working");
        });
}

async function viewEmployeesByManager(callback) {
    let managerFilter = await orm.getDepartments(
        "SELECT e.id as id, e.first_name as first_name, e.last_name as last_name, role.title as title, CONCAT(m.first_name,' ', m.last_name ) AS 'Manager' FROM employee e INNER JOIN role ON role.id = e.role_id INNER JOIN department ON department.id = role.department_id left JOIN employee m ON m.id = e.manager_id ORDER BY Manager;"
    );
    console.table(managerFilter);
    callback();
}

//remove an employee
function removeEmployee(callback) {
    let EmployeeArray = [];
    orm
        .employeesFullName()
        .then((message) => {
            console.log(message.length);
            for (let i = 0; i < message.length; i++) {
                let employee = message[i].full_name;
                EmployeeArray.push(employee);
            }
            inquirer
                .prompt([{
                    name: "viewEmployees",
                    type: "list",
                    message: "What Employee do you want to terminate?",
                    choices: EmployeeArray,
                }, ])
                .then(function(response) {
                    const answer = response.viewEmployees;
                    let nameSplit = answer.split(" ");
                    orm.deleteEmployee(nameSplit[0], nameSplit[1]);
                    callback();
                });
        })
        .catch(function(error) {
            console.log("not Working" + error);
        });
}

//add employee
async function addNewemployee(callback) {
    let EmployeeArray = [];
    let message = await orm.employeesFullName();
    for (let i = 0; i < message.length; i++) {
        let employee = message[i].full_name;
        EmployeeArray.push(employee);
    }
    let departmentArray = [];
    let departmentList = await orm.getDepartments(
        "SELECT role.title as name, role.id as id FROM role"
    );
    for (let i = 0; i < departmentList.length; i++) {
        let department = departmentList[i].name;
        departmentArray.push(department);
    }

    inquirer
        .prompt([{
                name: "newEmployeeFirstName",
                type: "input",
                message: "What is the employees first name?",
            },
            {
                name: "newEmployeeLastName",
                type: "input",
                message: "What is the employees last name?",
            },
            {
                name: "newEmployeeroleID",
                type: "list",
                message: "What is the employees role?",
                choices: departmentArray,
            },
            {
                name: "newEmployeeManagerID",
                type: "list",
                message: "What is the employees Manager ID?",
                choices: EmployeeArray,
            },
        ])
        .then(function(data) {
            let id;
            for (let i = 0; i < departmentList.length; i++) {
                if (departmentList[i].name === data.newEmployeeroleID) {
                    id = departmentList[i].id;
                    break;
                }
            }
            let managerID;
            for (let i = 0; i < message.length; i++) {
                if (message[i].full_name === data.newEmployeeManagerID) {
                    managerID = message[i].id;
                    break;
                }
            }
            orm.addnewEmployee(
                data.newEmployeeFirstName,
                data.newEmployeeLastName,
                id,
                managerID
            );
            callback();
        });
}

//remove an employee
function viewByTable(callback) {
    inquirer
        .prompt([{
            name: "viewByArea",
            type: "list",
            message: "What view do you want to see?",
            choices: ["department", "role", "Employee"],
        }, ])
        .then(function(response) {
            orm.SelectTableView(response.viewByArea).then((data) => {
                console.table(data);
            });
            callback();
        })
        .catch(function(error) {
            console.log("not Working" + error);
        });
}

async function updateEmployee(callback) {
    let roleTable = await orm.listOfDepartments();
    let employeeTable = await orm.employeesFullName();

    let roleArray = [];
    for (let i = 0; i < roleTable.length; i++) {
        let roles = roleTable[i].title;
        roleArray.push(roles);
    }
    let EmployeeArray = [];
    let message = await orm.employeesFullName();
    for (let i = 0; i < message.length; i++) {
        let employee = message[i].full_name;
        EmployeeArray.push(employee);
    }
    inquirer
        .prompt([{
                name: "employee",
                type: "list",
                message: "Who is the employee you want to update?",
                choices: EmployeeArray,
            },
            {
                name: "role",
                type: "list",
                message: "What is the new role of this employee?",
                choices: roleArray,
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the new manager for this employee?",
                choices: EmployeeArray,
            },
        ])
        .then(function(response) {
            let employeeid;
            for (let i = 0; i < employeeTable.length; i++) {
                if (response.employee === employeeTable[i].full_name) {
                    employeeid = employeeTable[i].id;
                }
            }
            let roleid;
            for (let i = 0; i < roleTable.length; i++) {
                if (response.role === roleTable[i].title) {
                    roleid = roleTable[i].id;
                }
            }
            let managerID;
            for (let i = 0; i < message.length; i++) {
                if (message[i].full_name === response.manager) {
                    managerID = message[i].id;
                    break;
                }
            }

            console.log(response);
            console.log(managerID);
            orm.updateEmployee(roleid, managerID, employeeid);
            callback();
        });
}

async function addNewDepartment(callback) {
    inquirer
        .prompt([{
            name: "newDepartment",
            type: "input",
            message: "What is the name of the new department you would like to add?",
        }, ])
        .then(function(response) {
            orm.addDepartment(response.newDepartment);
            callback();
        });
}

async function newRole(callback) {
    let departmentArray = [];
    let departmentList = await orm.getDepartments("SELECT * FROM department");
    for (let i = 0; i < departmentList.length; i++) {
        let department = departmentList[i].name;
        departmentArray.push(department);
    }

    inquirer
        .prompt([{
                name: "newRoleTitle",
                type: "input",
                message: "What is the tile of the new role you would like to add?",
            },
            {
                name: "newRoleSalary",
                type: "input",
                message: "What is the salary of the new role you would like to add?",
            },
            {
                name: "newRoleDepartmentID",
                type: "list",
                message: "What is the department of the new role you would like to add?",
                choices: departmentArray,
            },
        ])
        .then(function(response) {
            let id;
            for (let i = 0; i < departmentList.length; i++) {
                if (departmentList[i].name === response.newRoleDepartmentID) {
                    id = departmentList[i].id;
                    break;
                }
            }
            orm.addRole(response.newRoleTitle, response.newRoleSalary, id);
            callback();
        });
}