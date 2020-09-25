const mysql = require("mysql");

const connectionConfig = {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "employeedb",
};

module.exports = function viewByTable(answer) {
    var connection = mysql.createConnection(connectionConfig);

    connection.connect(function() {
        connection.query(`SELECT * FROM ??;`, [answer], function(error, data) {
            console.table(data);
        });
    });
};