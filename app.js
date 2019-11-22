const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(path.join(__dirname, "scirpt")));

router.get("/", function(req, res) {
  res.redirect("form.html");
});

app.use("/", router);
let listener = app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${listener.address().port}`);
});
