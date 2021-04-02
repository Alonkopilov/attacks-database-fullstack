import Chatbot from "react-simple-chatbot";
const apiAccess = require("./VirusTotalApiAccess");
var res = "";

function CustomChatbot(props) {
  const config = {
    width: "300px",
    height: "400px",
    floating: true,
  };

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
          value: "url",
          label: "Search Domain",
          trigger: "url-option",
        },
      ],
    },
    {
      id: "url-option",
      message: "Enter a URL: ",
      trigger: "get-url-input",
    },
    {
      id: "get-url-input",
      user: true,
      trigger: "search-url",
    },
    {
      id: "search-url",
      message: (dict) => {
        //return JSON.stringify(apiAccess.sendReq(dict["previousValue"]));
        return "hi";
      },
      trigger: "done",
    },
    {
      id: "done",
      message: "Ans: " + res,
      end: true,
    },
  ];

  return <Chatbot steps={steps} {...config} />;
}

export default CustomChatbot;
