import React, { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initializeFormState,
}) => {
  const initializeForm = () => {
    if (initializeFormState) {
      return initializeFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" value={activity.title} />
        <Form.Input rows={2} placeholder="Description" value={activity.description} />
        <Form.Input type="date" placeholder="Category" value={activity.category} />
        <Form.Input placeholder="Date" value={activity.date} />
        <Form.Input placeholder="City" value={activity.city} />
        <Form.Input placeholder="Venue" value={activity.venue} />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
