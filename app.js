const express = require("express");
const bodyParser = require("body-parser");
const { Pool, Client } = require("pg");
const app = express();
const path = require("path");
const router = express.Router();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  res.redirect("employee_list.html");
});

app.use("/", router);
let listener = app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

app.post("/api/form", (req, res) => {
  const { first_name, last_name, number, email, position, salary, hired_date } = req.body;
  const columns = "first_name, last_name, phone_number, email, position, salary, date_hired";

  // const client = new Client({
  //   user: "postgres",
  //   host: "localhost",
  //   database: "postgres",
  //   password: "1234",
  //   port: 5432
  // });

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  client.connect(err => {
    if (err) {
      console.log(`conection error`, err.stack);
      res.sendStatus(500);
    } else {
      console.log("Connected");
      client.query(
        `INSERT INTO employee (${columns}) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [first_name, last_name, number, email, position, salary, hired_date],
        (error, result) => {
          if (error) {
            console.log("Insert Failed", error.stack);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        }
      );
    }
  });
});

app.get("/api/data", (req, res) => {
  // const client = new Client({
  //   user: "postgres",
  //   host: "localhost",
  //   database: "postgres",
  //   password: "1234",
  //   port: 5432
  // });

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  client.connect(err => {
    if (err) {
      console.log(`conection error`, err.stack);
      res.sendStatus(500);
    } else {
      console.log("Connected");
      client.query(`SELECT * FROM employee`, (error, results) => {
        if (error) {
          console.log("retrieve data failed", error.stack);
          res.sendStatus(500);
        } else {
          res.status(200).json(results.rows);
        }
      });
    }
  });
});
