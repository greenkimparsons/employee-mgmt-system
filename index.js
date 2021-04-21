const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "#soberME2021",
  database: "cmsDB",
});

const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add a role",
        "Add an employee",
        "View departments",
        "View roles",
        "View employees",
        "Update role of an employee",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add a department":
          addDept();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "View departments":
          viewDepts();
          break;

        case "View roles":
          viewRoles();
          break;

        case "View employees":
          viewEmployees();
          break;

        case "Update role of an employee":
          updateRole();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const addDept = () => {
  inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "What department do you want to add?",
    })
    .then((answer) => {
      const query = "INSERT INTO dept SET ?";
      connection.query(query, { deptName: answer.dept }, (err, res) => {
        if (err) throw err;
        console.log(`The ${answer.dept} department has been added!`);
        start();
      });
    });
};

const addRole = () => {
    inquirer
      .prompt({
        name: "role",
        type: "input",
        message: "What role do you want to add?",
      })
      .then((answer) => {
        const query = "INSERT INTO role SET ?";
        connection.query(query, { title: answer.role }, (err, res) => {
          if (err) throw err;
          console.log(`${answer.role} role has been added!`);
          start();
        });
      });
};

// const addEmployee = () => {
//   connection.query(
//     "SELECT * FROM employee WHERE manager_id IS NULL;",
//     (err, data) => {
//       if (err) throw err;
//       connection.query("SELECT * FROM role SET", (err, data2) => {
//         if (err) throw err;

//         inquirer
//           .prompt([
//             {
//               name: "firstName",
//               type: "input",
//               message: "What is the employee's first name?",
//             },
//             {
//               name: "lastName",
//               type: "input",
//               message: "What is the employee's last name?",
//             },
//             {
//               name: "role",
//               type: "list",
//               message: "What is the employee's role?",
//               choices: data2.map(({ id, title }) => {
//                 return { name: title, value: id };
//               }),
//             },
//             {
//               name: "manager",
//               type: "list",
//               message: "Who is the employee's manager?",
//               choices: data.map(({ first_name, last_name, id }) => {
//                 return { name: first_name + " " + last_name, value: id };
//               }),
//             },
//           ])
//           .then((answer) => {
//             createEmployee(
//               answer.firstName,
//               answer.lastName,
//               answer.roleID,
//               answer.managerID
//             );
//           });
//       });
//     }
//   );
// };

// function createEmployee(firstName, lastName, roleID, managerID){
//     connection.query(
//         "INSERT INTO employee SET ?",
//         {
//             first_name: firstName,
//             last_name: lastName,
//             role_id: roleID,
//             manager_id: managerID,
//         },
//         (err, res) => {
//             if(err) throw err;
//             console.log("Employee has been added!");
//         }
//     );
//     start();
// }

connection.connect((err) => {
  //ERROR HANDLING
  if (err) throw err;
  console.log("Did I connect to the database", connection.threadId);
  start();
  //   connection.end();
});
