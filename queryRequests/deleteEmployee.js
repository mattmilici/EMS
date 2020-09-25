const mysql = require("mysql");

const connectionConfig = {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "employeedb",
};

module.exports = function deleteEmployee(firstName, lastName) {
    var connection = mysql.createConnection(connectionConfig);

    connection.connect(function() {
        connection.query(
            `DELETE FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, [firstName, lastName],
            function(error, data) {
                console.table(data);
            }
        );
    });
};