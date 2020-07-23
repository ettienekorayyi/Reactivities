import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Header, Icon, List, Container } from "semantic-ui-react";

import { cars } from "../../demo"; //
import { CarItem } from "../../CarItem";
import "./styles.css";
import NavBar from "../../features/nav/NavBar";
import { IActivity } from "../../models/activity";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    const response = axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
};

export default App;
