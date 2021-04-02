import nvt from "../../../node_modules/node-virustotal/code.js";
import "bootstrap/dist/css/bootstrap.css";
//const nvt = require("node-virustotal");

const API_KEY =
  "0e13fef58186eb24e5e6e7be0345b82539fa382863f94d19dc885d2e716aa932";
var lookupResult = "";

function sendReq(url) {
  const defaultTimedInstance = nvt.makeAPI();
  const result = defaultTimedInstance.domainLookup(url, (err, res) => {
    if (err) {
      lookupResult = err;
      console.log(err);
      return;
    }
    console.log(res);
    lookupResult = res;
  });

  return lookupResult;
}

module.exports.sendReq = sendReq;
