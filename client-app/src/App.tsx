import React from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

import logo from "./logo.svg";
import "./App.css";
import { cars } from "./demo"; //
import { CarItem } from "./CarItem";

class App extends React.Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      console.log(response);
      this.setState({
        values: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
