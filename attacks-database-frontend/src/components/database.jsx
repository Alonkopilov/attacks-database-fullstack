import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CustomChatbot from "./Chatbot/CustomChatbot";

class Database extends Component {
  state = {
    fullDatabase: [],
    attacks: [],
    searchTerm: "",
    eventCounter: 0,
  };

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <view style={{ textAlign: "center", color: "#ffffff" }}>
          <h1>Attack Patterns Database</h1>
          <p>
            Get updated on upcoming Office cyber attacks, get their details, and
            more.
          </p>
        </view>

        <div style={{ textAlign: "center" }}>
          <input
            style={{ width: "96%" }}
            type="text"
            value={this.state.searchTerm}
            onChange={this.editSearchTerm}
            placeholder="Search an attack by description"
          ></input>

          <Accordion defaultActiveKey="0">
            <div style={{ marginTop: "10px" }}>{this.arrToGroupList()}</div>
          </Accordion>
        </div>

        <CustomChatbot props={this.state.fullDatabase} />
      </div>
    );
  }

  editSearchTerm = (term) => {
    this.setState({ searchTerm: term.target.value });
  };

  dynamicSearch() {
    return this.state.fullDatabase.filter((attack) =>
      attack.description
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase())
    );
  }

  async sendDatabaseRequest() {
    var data = await fetch("http://localhost:3001/databaseRoute")
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    this.setState({ fullDatabase: data });
    this.databaseToArr();
  }

  componentDidMount() {
    this.sendDatabaseRequest();
    document.body.style.backgroundColor = "#191A1F";
  }

  arrToGroupList() {
    return this.dynamicSearch().map((attack) => (
      <Card
        style={{
          width: "96%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "3px",
          backgroundColor: "#121318",
          color: "#ffffff",
        }}
      >
        <Accordion.Toggle as={Card.Header} eventKey={attack.id}>
          {attack.name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={attack.id}>
          <Card.Body>
            <ul style={{ textAlign: "left" }}>
              <li>{"DESCRIPTION: " + attack.description} </li>
              <li>{"ID: " + attack.id} </li>
              <li>{"PLATFORMS: " + attack.x_mitre_platforms} </li>
              <li>{"DETECTION: " + attack.x_mitre_detection} </li>
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    ));
  }

  databaseToArr() {
    var arr = [];

    for (var i = 0; i < this.state.fullDatabase.length; i++) {
      arr.push(this.state.fullDatabase[i].name);
    }

    return arr;
  }
}

export default Database;
