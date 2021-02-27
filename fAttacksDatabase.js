const fs = require("fs");

/*
    Checks if a value is undefined.
    input: string value to check
    output: N/A if the value is undefined, else the given value
*/
function checkValue(value) {
  return value == undefined ? "N/A" : value;
}

/*
    Reads a json file to a dictionary object
    input: directory of a json file to read
    output: file content as a json object
*/
function readFileToDict(fileDir) {
  var contentStr = fs.readFileSync(fileDir, "utf-8");

  return JSON.parse(contentStr);
}

/*
    Adds relevant details from an attack json object to a dictionary.
    input: one attack json object
    output: a dictionary with the relevant attack details
*/
function getAttackDetails(attackJson) {
  var attackDetails = new Object();
  var attackObject = attackJson.objects[0];

  attackDetails = {
    name: checkValue(attackObject.name),
    description: checkValue(attackObject.description),
    id: checkValue(attackObject.id),
    x_mitre_platforms: checkValue(attackObject.x_mitre_platforms),
    x_mitre_detection: checkValue(attackObject.x_mitre_detection),
  };

  if (attackObject.kill_chain_phases != undefined) {
    attackDetails["phase_name"] = checkValue(
      attackObject.kill_chain_phases[0].phase_name
    );
  }

  return attackDetails;
}

/*
    Builds a database of attacks, from a given directory of all attacks
    input: string attacks directory
    output: array of dictionaries, each dictionary represents an attack
*/
function buildAttacksDatabase(attacksDir) {
  attacksDir = __dirname + attacksDir;

  //check if directory exists
  if (fs.existsSync(attacksDir) == false) {
    throw "Directory not found, exiting..";
  }

  var allAttackFiles = fs.readdirSync(attacksDir);
  var attacksDatabase = [];

  for (var i = 0; i < allAttackFiles.length; i++) {
    var fileDir = attacksDir + "\\" + allAttackFiles[i];
    var contentJson = readFileToDict(fileDir);
    var attackDetails = getAttackDetails(contentJson);

    attacksDatabase.push(attackDetails);
  }

  return attacksDatabase;
}

module.exports.buildAttacksDatabase = buildAttacksDatabase;
