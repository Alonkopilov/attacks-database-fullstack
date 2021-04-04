//Imports
import { buildAttacksDatabase } from "./fAttacksDatabase";
import EventsEmitter from "events";

myDatabase = buildAttacksDatabase("./attack-pattern");

console.log("\n\n\nAmount of attacks = " + myDatabase.length);

/*
const myServer = http.createServer(function (req, resp) {
  if (req.url == "/getDatabase") {
    resp.write(JSON.stringify(myDatabase));
    console.log("msg sent");
    resp.end();
  }
});

myServer.listen(5000);


const emitter = new EventsEmitter();

emitter.on("getLogin", function(arg){
	console.log("Username: " + arg.username + "\nPassword: " + arg.password + "\nMessage: " + arg.message);
})

emitter.emit("getLogin", {username: "Alon", password: "AlonK1974", message: "Hello world!"});
*/
