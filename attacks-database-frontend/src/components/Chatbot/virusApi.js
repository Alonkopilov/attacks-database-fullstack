var API_KEY =
  "0e13fef58186eb24e5e6e7be0345b82539fa382863f94d19dc885d2e716aa932";

function sendUrlReq(url) {
  var REPORT_URL = `https://cors-anywhere.herokuapp.com/https://www.virustotal.com/vtapi/v2/url/report?apikey=${API_KEY}&resource=${url}&allinfo=false`;
  var req = new XMLHttpRequest();

  req.open("GET", REPORT_URL, false);
  req.setRequestHeader("Content-Type", "application/json");
  req.send();

  if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
    var data = JSON.parse(req.responseText);
    return getResult(data);
  }

  return "Request Failed.";
}

function sendHashReq(hash) {
  var REPORT_URL = `https://cors-anywhere.herokuapp.com/https://www.virustotal.com/vtapi/v2/file/report?apikey=${API_KEY}&resource=${hash}&allinfo=false`;
  var req = new XMLHttpRequest();

  req.open("GET", REPORT_URL, false);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  req.send();

  if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
    var data = JSON.parse(req.responseText);
    return getResult(data);
  }

  return "Request Failed.";
}

function getResult(data) {
  if (data["response_code"] == 0) {
    return "Value Not Found.";
  }

  return (
    data["positives"] +
    " scans found this malicious out of " +
    data["total"] +
    " scans."
  );
}

module.exports.sendUrlReq = sendUrlReq;
module.exports.sendHashReq = sendHashReq;
