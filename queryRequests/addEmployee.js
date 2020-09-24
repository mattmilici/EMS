const mysql = require("mysql");

const connectionConfig = {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "employeedb",
};

module.exports = function addEmployee(firstName, lastName, roleID, managerID) {
    var connection = mysql.createConnection(connectionConfig);

    connection.connect(function() {
        connection.query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`, [firstName, lastName, roleID, managerID],
            function(error, data) {}
        );
    });
};