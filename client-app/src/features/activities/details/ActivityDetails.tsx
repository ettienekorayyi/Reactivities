import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface IProps {
  activities: IActivity[];
}

export const ActivityDetails: React.FC<IProps> = () => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Title</Card.Header>
        <Card.Meta>
          <span className="date">Date</span>
        </Card.Meta>
        <Card.Description>Description.</Card.Description>
      </Card.Content>
      <Card.Content extra>
       <Button.Group>
           <Button basic color='blue' content='Edit' />
           <Button basic color='grey' content='Cancel' />
       </Button.Group>
      </Card.Content>
    </Card>
  );
};
