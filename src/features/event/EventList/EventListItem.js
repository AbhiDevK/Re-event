import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
class EventListItem extends Component {
  render() {
    // Destructure the event from props
    const { event, handleOpenEvent, handleDeleteEvent } = this.props;
    return (
      <div>
        <Segment.Group>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                <Item.Content>
                  <Item.Header as="a">{event.title}</Item.Header>
                  <Item.Description>
                    Hosted by <a>{event.hostedBy}</a>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment>
            <span>
              <Icon name="clock" />
              {event.date}|<Icon name="marker" /> {event.venue}
            </span>
          </Segment>
          <Segment secondary>
            <List horizontal>
              {/*check if attendees are exist and For each attendee create a EventListAttendee Component */}
              {event.attendee &&
                event.attendees.map(attendee => (
                  <EventListAttendee
                    key={attendee.id}
                    /*pass the attendee data */
                    attendee={attendee}
                  />
                ))}
            </List>
          </Segment>
          <Segment clearing>
            <span>{event.description}</span>
            <Button
              onClick={handleDeleteEvent(
                event.id
              )} /* pass the current event which needs to be Deleted*/
              as="a"
              color="red"
              floated="right"
              content="Delete"
            />
            <Button
              onClick={handleOpenEvent(
                event
              )} /* pass the current event which needs to be updated */
              as="a"
              color="teal"
              floated="right"
              content="View"
            />
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
export default EventListItem;
