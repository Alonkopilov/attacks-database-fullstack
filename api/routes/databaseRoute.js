const fData = require("../../fAttacksDatabase");
var express = require("express");
var router = express.Router();

try {
  myDatabase = fData.buildAttacksDatabase(
    "C:\\Alonkopilov_Code_Projects\\attacks-database-fullstack\\attack-pattern"
  );
} catch (err) {
  const RED_COLOR = "\x1b[31m";
  const RESET_COLOR = "\x1b[0m";
  console.log(RED_COLOR + "%s" + RESET_COLOR, err);
}

router.get("/", (req, res, next) => {
  res.send(myDatabase);
});

module.exports = router;
