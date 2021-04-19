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
      connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ dept }) => console.log(answer.dept));
        runSearch();
      });
    });
};

// const multiSearch = () => {
//   const query =
//     "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, (err, res) => {
//     res.forEach(({ artist }) => console.log(artist));
//     runSearch();
//   });
// };

// const rangeSearch = () => {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then((answer) => {
//       const query =
//         "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], (err, res) => {
//         res.forEach(({ position, song, artist, year }) => {
//           console.log(
//             `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
//           );
//         });
//         runSearch();
//       });
//     });
// };

// const songSearch = () => {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?",
//     })
//     .then((answer) => {
//       console.log(answer.song);
//       connection.query(
//         "SELECT * FROM top5000 WHERE ?",
//         { song: answer.song },
//         (err, res) => {
//           if (res[0]) {
//             console.log(
//               `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
//             );
//           } else {
//             console.error(`No results for ${answer.song}`);
//           }
//           runSearch();
//         }
//       );
//     });
// };

// const songAndAlbumSearch = () => {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?",
//     })
//     .then((answer) => {
//       let query =
//         "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query +=
//         "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query +=
//         "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//       connection.query(query, [answer.artist, answer.artist], (err, res) => {
//         console.log(`${res.length} matches found!`);
//         res.forEach(({ year, position, artist, song, album }, i) => {
//           const num = i + 1;
//           console.log(
//             `${num} Year: ${year} Position: ${position} || Artist: ${artist} || Song: ${song} || Album: ${album}`
//           );
//         });

//         runSearch();
//       });
//     });
// };

connection.connect((err) => {
  //ERROR HANDLING
  if (err) throw err;
  console.log("Did I connect to the database", connection.threadId);
  start();
  connection.end();
});
