import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Header, Icon, List, Container } from "semantic-ui-react";

import { cars } from "../../demo"; //
import { CarItem } from "../../CarItem";
import "./styles.css";
import NavBar from "../../features/nav/NavBar";
import { IActivity } from "../../models/activity";
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const handleSelectActivity = (id:string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

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
        <ActivityDashboard 
          selectActivity={handleSelectActivity}
          activities={activities}
          selectedActivity={selectedActivity} />
      </Container>
    </Fragment>
  );
};

export default App;
