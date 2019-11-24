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

router.get("/", function(req, res) {
  res.redirect("form.html");
});

app.use("/", router);
let listener = app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

app.post("/form", (req, res) => {
  const { first_name, last_name, number, email, position, salary, hired_date } = req.body;
  const columns = "first_name, last_name, phone_number, email, position, salary, date_hired";

  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "1234",
    port: 5432
  });

  client.connect(err => {
    if (err) {
      console.log(`conection error`, err.stack);
    } else {
      console.log("Connected");
    }

    client.query(
      `INSERT INTO employee (${columns}) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [first_name, last_name, number, email, position, salary, hired_date],
      (error, result) => {
        if (error) {
          console.log("error");
          res.send("Failed to Insert");
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});
