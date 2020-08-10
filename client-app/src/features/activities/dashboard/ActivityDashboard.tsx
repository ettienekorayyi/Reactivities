import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";

import { IActivity } from "../../../models/activity";
import { ActivityList } from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import { ActivityForm } from "../../activities/form/ActivityForm";
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  activities: IActivity[];
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);