const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "amazon"
});

const start = () => {
    inquirer.prompt({
        name: "readInfo",
        type: "message",
        message: "Type whatever to see database"
    }).then((answer) => {
        console.log(answer);
    })
}

connection.connect((err) => {
    //ERROR HANDLING
    if(err) throw err; 
    console.log("Did I connect to the database", connection.threadId);
    start();
    connection.end();
})