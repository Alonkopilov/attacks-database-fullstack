import Chatbot from "react-simple-chatbot";
const apiAccess = require("./virusApi");

var fullDatabase = [];

function CustomChatbot(props) {
  const config = {
    width: "500px",
    height: "400px",
    floating: true,
  };

  sendDatabaseRequest();

  const steps = [
    {
      id: "Start",
      message: "Welcome!",
      trigger: "opening",
    },
    {
      id: "opening",
      message: "Choose an option:",
      trigger: "get_input",
    },
    {
      id: "get_input",
      options: [
        {
          value: "platform",
          label: "Search by platform",
          trigger: "platform-search-request",
        },
        {
          value: "detection",
          label: "Get detection of attack",
          trigger: "detection-search-request",
        },
        {
          value: "platforms",
          label: "Get platforms of an attack",
          trigger: "get-platform-request",
        },
        {
          value: "url",
          label: "Scan URL in VirusTotal",
          trigger: "virustotal-url-request",
        },
        {
          value: "hash",
          label: "Scan Hash in VirusTotal",
          trigger: "virustotal-hash-request",
        },
      ],
    },
    //VirusTotal HASH
    {
      id: "virustotal-hash-request",
      message: "Enter a Hash: ",
      trigger: "virustotal-hash-input",
    },
    {
      id: "virustotal-hash-input",
      user: true,
      trigger: "get-hash-result",
    },
    {
      id: "get-hash-result",
      message: (dict) => {
        return apiAccess.sendHashReq(dict["previousValue"]);
      },
      trigger: "opening",
    },

    //VirusTotal URL
    {
      id: "virustotal-url-request",
      message: "Enter a url: ",
      trigger: "virustotal-url-input",
    },
    {
      id: "virustotal-url-input",
      user: true,
      trigger: "get-url-result",
    },
    {
      id: "get-url-result",
      message: (dict) => {
        return apiAccess.sendUrlReq(dict["previousValue"]);
      },
      trigger: "opening",
    },

    //GET PLATFORM
    {
      id: "get-platform-request",
      message: "Enter an attack name: ",
      trigger: "get-platform-input",
    },
    {
      id: "get-platform-input",
      user: true,
      trigger: "get-platform",
    },
    {
      id: "get-platform",
      message: (dict) => {
        return getDataInString(3, dict["previousValue"]);
      },
      trigger: "opening",
    },

    //DETECTION SEARCH
    {
      id: "detection-search-request",
      message: "Enter an attack name: ",
      trigger: "detection-search-input",
    },
    {
      id: "detection-search-input",
      user: true,
      trigger: "detection-search",
    },
    {
      id: "detection-search",
      message: (dict) => {
        return getDataInString(2, dict["previousValue"]);
      },
      trigger: "opening",
    },

    //PLATFORM SEARCH
    {
      id: "platform-search-request",
      message: "Enter a platform (e.g. Office 365, Windows): ",
      trigger: "platform-search-input",
    },
    {
      id: "platform-search-input",
      user: true,
      trigger: "platform-search",
    },
    {
      id: "platform-search",
      message: (dict) => {
        return getDataInString(1, dict["previousValue"]);
      },
      trigger: "opening",
    },
  ];

  return <Chatbot steps={steps} {...config} />;
}

async function sendDatabaseRequest() {
  var data = await fetch("http://localhost:3001/databaseRoute")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  fullDatabase = data;
}

function getDataInString(choice, arg) {
  if (choice == 1) {
    return searchDatabaseByPlatform(arg);
  }
  if (choice == 2) {
    return searchDetectionOfAttack(arg);
  }
  if (choice == 3) {
    return getPlatformsOfAttack(arg);
  }
}

function getPlatformsOfAttack(attackName) {
  for (var i = 0; i < fullDatabase.length; i++) {
    if (fullDatabase[i].name.includes(attackName)) {
      return fullDatabase[i].x_mitre_platforms.toString();
    }
  }

  return "No Results.";
}

function searchDetectionOfAttack(attackName) {
  for (var i = 0; i < fullDatabase.length; i++) {
    if (fullDatabase[i].name.includes(attackName)) {
      return fullDatabase[i].x_mitre_detection;
    }
  }

  return "No Results.";
}

function searchDatabaseByPlatform(platform) {
  var result = "";

  for (var i = 0; i < fullDatabase.length; i++) {
    if (fullDatabase[i].x_mitre_platforms.includes(platform)) {
      result += fullDatabase[i].name + ", ";
    }
  }

  if (result == "") {
    result = "No Results.";
  }

  return result;
}

export default CustomChatbot;
