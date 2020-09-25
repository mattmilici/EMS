const mysql = require("mysql");
const inquirer = require("inquirer");
const viewAllEmployeesQuery = require("./queryRequests/viewAllEmployeesQuery");
const viewEmployeesByDepartment = require("./queryRequests/viewAllEmployeesByDeptarment");
const getdepartments = require("./queryRequests/listOfDepartments");
const getEmployees = require("./queryRequests/listOfEmployees");
const deleteEmployee = require("./queryRequests/deleteEmployee");
const addEmployee = require("./queryRequests/addEmployee");
const getManagers = require("./queryRequests/getManagers");
const viewByTable = require("./queryRequests/viewbytable");

// kickOff();

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
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
            ],
        }, ])
        .then(function(response) {
            const answer = response.startingPrompt;
            switch (answer) {
                case "View All Employees":
                    //displays table of all employees
                    viewAllEmployeesQuery();
                    break;
                case "View All Employees by Department":
                    viewAllEmpByDep();
                    break;
                case "View All Employees by Manager":
                    break;
                case "Add Employee":
                    addNewemployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    break;
                case "Update Employee Manager":
                    break;
            }
        });
}

//prompt generated if the user selects to view employees by deparment
function viewAllEmpByDep() {
    let departmentArray = [];
    getdepartments("SELECT department.name FROM department")
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
                    viewEmployeesByDepartment(answer);
                });
        })
        .catch(function(error) {
            console.log("not Working");
        });
}

//remove an employee
function removeEmployee() {
    let EmployeeArray = [];
    getEmployees(
            "SELECT CONCAT(employee.first_name, ' ', employee.last_name) as full_name, employee.id as id FROM employee WHERE first_name OR last_name IS NOT NULL"
        )
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
                    deleteEmployee(nameSplit[0], nameSplit[1]);
                });
        })
        .catch(function(error) {
            console.log("not Working" + error);
        });
}

//add employee
async function addNewemployee() {
    let EmployeeArray = [];
    let message = await getEmployees(
        "SELECT CONCAT(employee.first_name, ' ', employee.last_name) as full_name, employee.id as id FROM employee WHERE first_name OR last_name IS NOT NULL"
    );
    for (let i = 0; i < message.length; i++) {
        let employee = message[i].full_name;
        EmployeeArray.push(employee);
    }
    let departmentArray = [];
    let departmentList = await getEmployees(
        "SELECT role.title as name, role.id as id FROM role"
    );
    for (let i = 0; i < departmentList.length; i++) {
        let department = departmentList[i].name;
        departmentArray.push(department);
    }
    console.log(departmentArray);

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
                    managerID = message[i].full_name;
                    break;
                }
            }
            addEmployee(
                data.newEmployeeFirstName,
                data.newEmployeeLastName,
                id,
                data.managerID
            );
        });
}

//remove an employee
function viewbyArea() {
    inquirer
        .prompt([{
            name: "viewByArea",
            type: "list",
            message: "What Employee do you want to terminate?",
            choices: ["department", "role", "Employee"],
        }, ])
        .then(function(response) {
            viewByTable(response.viewByArea).then((data) => {
                console.table(data);
            });
        })
        .catch(function(error) {
            console.log("not Working" + error);
        });
}

viewbyArea();