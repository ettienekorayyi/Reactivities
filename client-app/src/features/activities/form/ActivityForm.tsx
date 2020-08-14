import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initializeFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initializeFormState && setActivity(initializeFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    clearActivity,
    loadActivity,
    match.params.id,
    initializeFormState,
    activity.id.length,
  ]);
  
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          placeholder="Title"
          name="title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          rows={2}
          placeholder="Description"
          name="description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          placeholder="Category"
          name="category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          placeholder="Date"
          name="date"
          type="datetime-local"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          placeholder="City"
          name="city"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          placeholder="Venue"
          name="venue"
          value={activity.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/activities')}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
