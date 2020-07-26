import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

export const ActivityForm = () => {
    return (
        <Segment>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.Input rows={2} placeholder='Description' />
                <Form.Input type='date' placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venue' />
            </Form>
        </Segment>
    )
}
