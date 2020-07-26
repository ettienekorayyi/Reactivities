import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../../activities/form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList selectActivity={selectActivity} activities={activities} />
      </Grid.Column>
      <Grid.Column width={6}>
        { selectedActivity && <ActivityDetails activity={selectedActivity} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};
