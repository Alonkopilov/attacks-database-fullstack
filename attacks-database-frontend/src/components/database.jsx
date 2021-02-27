import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ListGroup from "react-bootstrap/ListGroup";

class Database extends Component {
  state = {
    fullDatabase: [],
    attacks: [],
    searchTerm: "",
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <view style={{ textAlign: "center" }}>
          <h1 className="m-4">Attack Patterns Database</h1>
          <p>
            Get updated on upcoming Office cyber attacks, get their details, and
            more.
          </p>
        </view>

        <div style={{ textAlign: "center" }}>
          <input
            style={{ width: 1300 }}
            type="text"
            value={this.state.searchTerm}
            onChange={this.editSearchTerm}
            placeholder="Search an attack by description"
          ></input>

          <ListGroup className="m-4" action variant="info">
            <span>{this.arrToGroupList()}</span>
          </ListGroup>
        </div>
      </React.Fragment>
    );
  }

  editSearchTerm = (term) => {
    this.setState({ searchTerm: term.target.value });
  };

  dynamicSearch() {
    return this.getAttackNames().filter((attack) =>
      attack.toLowerCase().includes(this.state.searchTerm.toLowerCase())
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
  }

  arrToGroupList() {
    return this.dynamicSearch().map((name) => (
      <ListGroup.Item action variant="info">
        <span>{name}</span>
      </ListGroup.Item>
    ));
  }

  getAttackNames() {
    var arr = [];

    this.state.fullDatabase.forEach((item, index) => {
      arr.push(item.name);
    });

    return arr;
  }

  databaseToArr() {
    var arr = [];

    console.log(this.state.fullDatabase);

    for (var i = 0; i < this.state.fullDatabase.length; i++) {
      arr.push(this.state.fullDatabase[i].name);
    }

    console.log(arr);

    return arr;
  }
}

export default Database;
