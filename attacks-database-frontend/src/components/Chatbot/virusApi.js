var API_KEY =
  "0e13fef58186eb24e5e6e7be0345b82539fa382863f94d19dc885d2e716aa932";

function sendReq(url) {
  var REPORT_URL = `https://cors-anywhere.herokuapp.com/https://www.virustotal.com/vtapi/v2/url/report?apikey=${API_KEY}&resource=${url}&allinfo=false`;
  var req = new XMLHttpRequest();

  req.open("GET", REPORT_URL, false);
  req.setRequestHeader("Content-Type", "application/json");
  req.send();

  if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
    var data = JSON.parse(req.responseText);

    if (data["response_code"] == 0) {
      return "URL Not Found.";
    }

    return (
      data["positives"] +
      " scans found this URL malicious out of " +
      data["total"] +
      " scans."
    );
  }

  return "No results.";
}

module.exports.sendReq = sendReq;
