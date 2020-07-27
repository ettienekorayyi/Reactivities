import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

interface IProps {
    setEditMode: (editMode: boolean) => void;
  }

export const ActivityForm: React.FC<IProps> = ({ setEditMode }) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.Input rows={2} placeholder='Description' />
                <Form.Input type='date' placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venue' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}
